package com.ezequielbolzi.AssignmentSumbission.repository;

import com.ezequielbolzi.AssignmentSumbission.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}

