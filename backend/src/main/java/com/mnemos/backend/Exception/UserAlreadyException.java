package com.mnemos.backend.Exception;

public class UserAlreadyException extends RuntimeException{
    public  UserAlreadyException(String message){
        super(message);
    }
}
