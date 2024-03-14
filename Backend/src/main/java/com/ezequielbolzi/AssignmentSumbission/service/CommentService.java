package com.ezequielbolzi.AssignmentSumbission.service;

import com.ezequielbolzi.AssignmentSumbission.domain.Assignment;
import com.ezequielbolzi.AssignmentSumbission.domain.Comment;
import com.ezequielbolzi.AssignmentSumbission.domain.User;
import com.ezequielbolzi.AssignmentSumbission.dto.CommentDto;
import com.ezequielbolzi.AssignmentSumbission.repository.AssignmentRepository;
import com.ezequielbolzi.AssignmentSumbission.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepo;

    @Autowired
    private AssignmentRepository assignmentRepo;

    public Comment save(CommentDto commentDto, User user){
        Comment comment = new Comment();
        Assignment assignment = assignmentRepo.getById(commentDto.getAssignmentId());

        comment.setId(commentDto.getId());
        comment.setAssignment(assignment);
        comment.setText(commentDto.getText());
        comment.setCreatedBy(user);
        if(comment.getId() == 0) {
            comment.setCreateDate(LocalDateTime.now());
        }
        return commentRepo.save(comment);
    }

    public Set<Comment> getCommentsByAssignmentId(Long assignmentId) {
        Set<Comment> comments = commentRepo.findByAssignmentId(assignmentId);
        return comments;
    }
    public void delete(Long commentId, UserDetails user) {
        // First, retrieve the comment by its ID
        Comment comment = commentRepo.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found with id " + commentId));

        // Perform authorization check
        // This is a simple example. You might need to adjust this based on your application's security requirements.
        if (!comment.getCreatedBy().getUsername().equals(user.getUsername())) {
            throw new SecurityException("User is not authorized to delete this comment");
        }

        // If the user is authorized, proceed with the deletion
        commentRepo.delete(comment);
    }
}
