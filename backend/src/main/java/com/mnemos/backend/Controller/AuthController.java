package com.mnemos.backend.Controller;

import com.mnemos.backend.Service.AuthService;
import com.mnemos.backend.Service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("auth")


public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> request, HttpServletResponse httpServletResponse){
        return authService.signup(request.get("email"), request.get("password"), httpServletResponse);
    }

    @PostMapping("/signin")
    public String signin(@RequestBody Map<String, String> request, HttpServletResponse httpServletResponse){
        return authService.signin(request.get("email"), request.get("password"), httpServletResponse);
    }
}
