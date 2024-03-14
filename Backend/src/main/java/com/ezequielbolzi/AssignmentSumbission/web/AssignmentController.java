package com.ezequielbolzi.AssignmentSumbission.web;

import java.util.Optional;
import java.util.Set;

import com.ezequielbolzi.AssignmentSumbission.domain.Assignment;
import com.ezequielbolzi.AssignmentSumbission.domain.User;
import com.ezequielbolzi.AssignmentSumbission.dto.AssignmentResponseDto;
import com.ezequielbolzi.AssignmentSumbission.enums.AuthorityEnum;
import com.ezequielbolzi.AssignmentSumbission.service.AssignmentService;
import com.ezequielbolzi.AssignmentSumbission.service.UserService;
import com.ezequielbolzi.AssignmentSumbission.util.AuthorityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {
    @Autowired
    private AssignmentService assignmentService;
    @Autowired
    private UserService userService;
    @PostMapping("")
    public ResponseEntity<?> createAssignment(@AuthenticationPrincipal User user) {
        Assignment newAssignment = assignmentService.save(user);
        return ResponseEntity.ok(newAssignment);
    }
    @GetMapping("")
    public ResponseEntity<?> getAssignment(@AuthenticationPrincipal User user){
        Set<Assignment> assignmentByUser = assignmentService.findByUser(user);
        return ResponseEntity.ok(assignmentByUser);
    }

    @GetMapping("{assignmentId}")
    public ResponseEntity<?> getAssignments(@PathVariable Long assignmentId, @AuthenticationPrincipal User user){
        Optional<Assignment> assignmentOptional = assignmentService.findById(assignmentId);
        return ResponseEntity.ok( new AssignmentResponseDto(assignmentOptional.orElse(new Assignment())));
    }

    @PutMapping("{assignmentId}")
    public ResponseEntity<?> updateAssignments(@PathVariable Long assignmentId,
                                               @RequestBody Assignment assignment,
                                               @AuthenticationPrincipal User user){
        // Add the code Reviewer to this assignment if it was claimed
        if(assignment.getCodeReviewer() != null){
            User codeReviewer = assignment.getCodeReviewer();
            codeReviewer  = userService.findUserByUsername(codeReviewer.getUsername()).orElse(new User());

            if(AuthorityUtil.hasRole(AuthorityEnum.CODE_REVIEWER.name(), codeReviewer)){
                assignment.setCodeReviewer(codeReviewer);
            }

        }
        Assignment updateAssignment = assignmentService.save(assignment);
        return ResponseEntity.ok(updateAssignment);
    }
}