package com.mnemos.backend.Utils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;

public class CookieUtils {
    @Value("${cookie.secure}")
    private static boolean secure = false;


    public static ResponseCookie CreateCookie(String name, String data){
        return ResponseCookie.from(name, data)
                .httpOnly(true)
                .secure(secure)
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .sameSite("Strict")
                .build();

    }

    public static String getCookie(HttpServletRequest request, String name){
        Cookie[] cookies = request.getCookies();
        if(cookies!=null){
            for(Cookie cookie: cookies){
                if(name.equals(cookie.getName())){
                    return cookie.getValue();
                }
            }
        }

        return null;
    }

    public static void deleteCookie(HttpServletResponse response, String name){
        ResponseCookie cookie = ResponseCookie.from(name,"")
                .httpOnly(true)
                .secure(secure)
                .sameSite("Strict")
                .maxAge(0)
                .path("/")
                .build();
        response.addHeader("Set-Cookie", cookie.toString());
    }
}
