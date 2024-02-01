package com.ezequielbolzi.AssignmentSumbission.util;

import com.ezequielbolzi.AssignmentSumbission.domain.User;

public class AuthorityUtil {

    public static Boolean hasRole(String role, User user) {
        return user.getAuthorities()
                .stream()
                .filter(auth -> auth.getAuthority().equals(role))
                .count() > 0;
    }
}