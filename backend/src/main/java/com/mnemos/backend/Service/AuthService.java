package com.mnemos.backend.Service;

import com.mnemos.backend.Entity.User;
import com.mnemos.backend.Exception.BadRequestException;
import com.mnemos.backend.Exception.NotFoundException;
import com.mnemos.backend.Exception.UserAlreadyException;
import com.mnemos.backend.Exception.UserNotFoundException;
import com.mnemos.backend.Repository.FileRepository;
import com.mnemos.backend.Repository.UserRepository;
import com.mnemos.backend.Security.JwtUtil;
import com.mnemos.backend.Utils.ResponseGenerator;
import com.mnemos.backend.Utils.SetCookie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseCookie;
import jakarta.servlet.http.HttpServletResponse;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileService fileService;


    @Autowired
    private JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ResponseEntity<?> signup(String firstname, String lastname, String email, String password, HttpServletResponse httpServletResponse){
        if(userRepository.findUserByEmail(email).isPresent()){
            throw new BadRequestException("User Already Exists!");
        }

        //create a new user
        User user = new User();
        user.setFirstname(firstname);
        user.setLastname(lastname);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
        ResponseCookie jwtCookie = SetCookie.CreateCookie("token",jwtUtil.generateToken(user.getId().toString()));
        ResponseCookie jwtRefreshCookie = SetCookie.CreateCookie("refreshtoken",jwtUtil.generateRefreshToken(user.getId().toString()));

        //create a new folder
        fileService.CreateFolder(user.getFirstname() + "'s", null, user);


        //send cookie
        httpServletResponse.addHeader("Set-Cookie", jwtCookie.toString());
        httpServletResponse.addHeader("Set-Cookie", jwtRefreshCookie.toString());

        //respond
        return ResponseEntity.ok(ResponseGenerator.generateResponse(HttpStatus.OK, "Account Created Succesfully", true));
    }

    public String signin(String email, String password, HttpServletResponse httpServletResponse){
        Optional<User> user = userRepository.findUserByEmail(email);
        if(user.isEmpty()){
            throw new NotFoundException("User Not Found");
        }
        if (!passwordEncoder.matches(password, user.get().getPassword())){
            throw new BadRequestException("Wrong Credentials");
        }
        return jwtUtil.generateToken(user.get().getId().toString());

    }
}
