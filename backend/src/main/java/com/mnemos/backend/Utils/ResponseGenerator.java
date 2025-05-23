package com.mnemos.backend.Utils;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class ResponseGenerator {
    public static Map<String, Object> generateResponse(HttpStatus status, Object message, boolean success){
        Map<String, Object> resp = new HashMap<>();
        resp.put("status", status.value());
        resp.put("message", message);
        resp.put("success", success);
        return resp;
    }
}
