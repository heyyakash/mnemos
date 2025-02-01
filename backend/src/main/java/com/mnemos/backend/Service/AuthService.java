package com.mnemos.backend.Service;

import com.mnemos.backend.Entity.User;
import com.mnemos.backend.Exception.BadRequestException;
import com.mnemos.backend.Exception.NotFoundException;
import com.mnemos.backend.Exception.UserAlreadyException;
import com.mnemos.backend.Exception.UserNotFoundException;
import com.mnemos.backend.Repository.UserRepository;
import com.mnemos.backend.Security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String signup(String email, String username, String password){
        if(userRepository.findUserByEmail(email).isPresent()){
            throw new BadRequestException("User Already Exists!");
        }
        User user = new User();
        user.setEmail(email);
        user.setUsername(email);
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
        return "Account Created Successfully";
    }

    public String signin(String email, String password){
        Optional<User> user = userRepository.findUserByEmail(email);
        if(user.isEmpty()){
            throw new NotFoundException("User Not Found");
        }
        if (!passwordEncoder.matches(password, user.get().getPassword())){
            throw new BadRequestException("Wrong Credentials");
        }
        return jwtUtil.generateToken(user.get().getEmail());

    }
}
