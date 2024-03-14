package com.ezequielbolzi.AssignmentSumbission.service;

import com.ezequielbolzi.AssignmentSumbission.domain.User;
import com.ezequielbolzi.AssignmentSumbission.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepo;
    public Optional<User> findUserByUsername(String username){
        return userRepo.findByUsername(username);
    }
}

