package com.ezequielbolzi.AssignmentSumbission.service;


import com.ezequielbolzi.AssignmentSumbission.domain.Assignment;
import com.ezequielbolzi.AssignmentSumbission.domain.User;
import com.ezequielbolzi.AssignmentSumbission.repository.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.security.PublicKey;
import java.util.Optional;
import java.util.Set;

@Service
public class AssignmentService {
    @Autowired
    private AssignmentRepository assignmentRepo;

    public Assignment save(User user){
        Assignment assignment = new Assignment();
        assignment.setStatus("Needs to be Sumbitted");
        assignment.setUser(user);
        return assignmentRepo.save(assignment);
    }

    public Set<Assignment> findByUser (User user){
        return assignmentRepo.findByUser(user);
    }
    public Optional<Assignment> findById(Long assignmentId){
        return assignmentRepo.findById(assignmentId);
    }

    public Assignment save(Assignment assignment) {
        return assignmentRepo.save(assignment);
    }
}