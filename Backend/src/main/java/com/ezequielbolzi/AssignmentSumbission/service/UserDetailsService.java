package com.ezequielbolzi.AssignmentSumbission.service;

import com.ezequielbolzi.AssignmentSumbission.domain.User;
import com.ezequielbolzi.AssignmentSumbission.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userOpt = userRepo.findByUsername(username);
        return userOpt.orElseThrow(()-> new UsernameNotFoundException("Invalid Credentials"));
    }
}
