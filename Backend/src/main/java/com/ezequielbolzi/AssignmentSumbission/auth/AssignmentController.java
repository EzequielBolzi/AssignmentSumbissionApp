package com.ezequielbolzi.AssignmentSumbission.auth;


import java.util.Map;
import java.util.Optional;
import java.util.Set;

import com.ezequielbolzi.AssignmentSumbission.domain.Assignment;
import com.ezequielbolzi.AssignmentSumbission.domain.User;
import com.ezequielbolzi.AssignmentSumbission.service.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {
    @Autowired
    private AssignmentService assignmentService;
    @PostMapping("")
    public ResponseEntity<?> createAssignment(@AuthenticationPrincipal User user) {
        Assignment newAssignment = assignmentService.save(user);

        return ResponseEntity.ok(newAssignment);
    }

    @GetMapping("")
    public ResponseEntity<?> getAssignments(@AuthenticationPrincipal User user) {
        Set<Assignment> assignmentsByUser = assignmentService.findByUser(user);
        return ResponseEntity.ok(assignmentsByUser);
    }

    @GetMapping("{assignmentId}")
    public ResponseEntity<?> getAssignment(@PathVariable Long assignmentId, @AuthenticationPrincipal User user) {
        Optional<Assignment> assignmentOpt = assignmentService.findById(assignmentId);
        return ResponseEntity.ok(assignmentOpt.orElse(new Assignment()));
    }



    
}