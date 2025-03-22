package com.mnemos.backend.middleware;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.mnemos.backend.Exception.StatusFoundException;
import com.mnemos.backend.Security.JwtUtil;
import com.mnemos.backend.Utils.CookieUtils;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;

@Component
public class AuthenticatedFilter implements HandlerInterceptor {
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)  throws IOException {
        String token = CookieUtils.getCookie(request, "token");


        if(token == null || token.isEmpty()){
            deleteToken(response);
            throw new StatusFoundException("No Token");

        }

        try{
            Claims claims = jwtUtil.decodeJWT(token);
            boolean expired = jwtUtil.isTokenExpired(token);

            if(!"auth".equals(claims.get("type"))){
                deleteToken(response);
                throw new StatusFoundException("Omnious token");
            }

            if(expired){
                String refreshToken = CookieUtils.getCookie(request, "refreshtoken");
                if(refreshToken == null || refreshToken.isEmpty() || jwtUtil.isTokenExpired(refreshToken)){
                    deleteToken(response);
                    throw new StatusFoundException("Session Expired");

                }

                Claims refreshTokenClaims = jwtUtil.decodeJWT(refreshToken);
                if(!"auth".equals(refreshTokenClaims.get("type"))){
                    deleteToken(response);
                    throw new StatusFoundException("Omnious refresh token");

                }

                try{
                    String newToken = jwtUtil.generateToken(refreshTokenClaims.get("uid").toString(), "auth");
                    ResponseCookie newCookie = CookieUtils.CreateCookie("token", newToken);
                    CookieUtils.deleteCookie(response, "token");
                    response.setHeader("Set-Cookie", newCookie.toString());
                }catch (Exception e){
                    System.out.println("Error in generating JWT");
                    throw new StatusFoundException("Error in refreshing session");
                }

            }

            request.setAttribute("uid",claims.get("uid"));
            return true;

        } catch (Exception e) {
            deleteToken(response);
            throw new StatusFoundException("Error in parsing JWT");

        }
    }


    private void deleteToken(HttpServletResponse response){
        CookieUtils.deleteCookie(response, "token");
        CookieUtils.deleteCookie(response,"refreshtoken");
    }


}
