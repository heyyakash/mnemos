package com.mnemos.backend.Utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;

public class SetCookie {
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
}
