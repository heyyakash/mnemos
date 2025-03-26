package com.mnemos.backend.Service;

import com.mnemos.backend.Entity.User;
import com.mnemos.backend.Exception.InternalServerErrorException;
import com.mnemos.backend.Exception.NotFoundException;
import com.mnemos.backend.Exception.StatusFoundException;
import com.mnemos.backend.Repository.UserRepository;
import com.mnemos.backend.Utils.CookieUtils;
import com.mnemos.backend.Utils.ResponseGenerator;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<?> getUserDetails(HttpServletRequest request, HttpServletResponse response){
        try {
            String suid = request.getAttribute("uid").toString();
            UUID uid = UUID.fromString(suid);

            Optional<User> user = userRepository.findUserById(uid);
            if(user.isEmpty()){
                CookieUtils.deleteCookie(response, "token");
                CookieUtils.deleteCookie(response, "refreshtoken");
                throw new StatusFoundException("User Not Found");
            }
            User userDetails = user.get();
            userDetails.setPassword("");
            return  ResponseEntity.ok((ResponseGenerator.generateResponse(HttpStatus.OK, userDetails, true)));
        }catch (Exception e){
            System.out.println(e);
            throw new StatusFoundException("Error in getting user");
        }
    }

}
