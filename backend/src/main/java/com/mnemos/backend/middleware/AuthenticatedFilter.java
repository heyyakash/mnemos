package com.mnemos.backend.middleware;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.mnemos.backend.Exception.StatusFoundException;
import com.mnemos.backend.Security.JwtUtil;
import com.mnemos.backend.Utils.CookieUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;

//@Component
//public class AuthenticatedFilter extends HandlerInterceptor {
//    @Autowired
//    private JwtUtil jwtUtil;
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    @Override
//    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)  throws IOException {
//        String token = CookieUtils.getCookie(request, "token");
//
//        if(token == null || token.isEmpty() || jwtUtil.isTokenExpired(token)){
//            CookieUtils.deleteCookie(response, "token");
//            CookieUtils.deleteCookie(response,"refreshtoken");
//            throw new StatusFoundException("Session Expired");
//            return false;
//        }
//
//        try{
//
//        }
//
//    }




//}
