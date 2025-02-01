package com.mnemos.backend.Service;

import com.mnemos.backend.Entity.User;
import com.mnemos.backend.Repository.UserRepository;
import com.mnemos.backend.Security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class Auth {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String signup(String email, String username, String password){
        if(userRepository.findUserByEmail(email).isPresent()){
            throw new RuntimeException("User Already Exists");
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
            throw new RuntimeException("User does not exist");
        }
        if (!passwordEncoder.encode(password).matches(user.get().getPassword())){
            throw new RuntimeException("Wrong Credentials");
        }
        return jwtUtil.generateToken(user.get().getEmail());

    }
}
