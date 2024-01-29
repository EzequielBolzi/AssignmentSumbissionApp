package com.ezequielbolzi.AssignmentSumbission;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordEnconderTest {
    @Test
    public void encode_password(){
        PasswordEncoder passwordEnconder = new BCryptPasswordEncoder();
        System.out.println(passwordEnconder.encode("asdfasdf"));
    }
}
