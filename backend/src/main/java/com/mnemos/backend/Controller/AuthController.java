package com.mnemos.backend.Controller;

import com.mnemos.backend.Service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("auth")
@AllArgsConstructor
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public String signup(@RequestBody Map<String, String> request){
        return authService.signup(request.get("email"), request.get("username"), request.get("password"));
    }

    @PostMapping("/signin")
    public String signin(@RequestBody Map<String, String> request){
        return authService.signin(request.get("email"), request.get("password"));
    }
}
