package com.ezequielbolzi.AssignmentSumbission.auth;

import org.springframework.security.core.AuthenticationException;

public class BadCredentialsException extends AuthenticationException {

    /**
     * Constructs a <code>BadCredentialsException</code> with the specified message.
     * @param msg the detail message
     */
    public BadCredentialsException(String msg) {
        super(msg);
    }

    /**
     * Constructs a <code>BadCredentialsException</code> with the specified message and
     * root cause.
     * @param msg the detail message
     * @param cause root cause
     */
    public BadCredentialsException(String msg, Throwable cause) {
        super(msg, cause);
    }
}