package com.ezequielbolzi.AssignmentSumbission.repository;

import com.ezequielbolzi.AssignmentSumbission.domain.Assignment;
import com.ezequielbolzi.AssignmentSumbission.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    Set<Assignment> findByUser(User user);

}
