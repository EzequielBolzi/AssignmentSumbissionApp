package com.ezequielbolzi.AssignmentSumbission.web;

import com.ezequielbolzi.AssignmentSumbission.domain.Comment;
import com.ezequielbolzi.AssignmentSumbission.domain.User;
import com.ezequielbolzi.AssignmentSumbission.dto.CommentDto;
import com.ezequielbolzi.AssignmentSumbission.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping("")
    public ResponseEntity<Comment> createComment (@RequestBody CommentDto commentDto, @AuthenticationPrincipal User user) {
        Comment comment = commentService.save(commentDto, user);

        return ResponseEntity.ok(comment);
    }
    @PutMapping("{commentId}")
    public ResponseEntity<Comment> uptadeComment (@RequestBody CommentDto commentDto, @AuthenticationPrincipal User user) {
        Comment comment = commentService.save(commentDto, user);

        return ResponseEntity.ok(comment);
    }
    @GetMapping("")
    public ResponseEntity<Set<Comment>> getCommentsByAssignment(@RequestParam Long assignmentId) {
        Set<Comment> comments = commentService.getCommentsByAssignmentId(assignmentId);

        return ResponseEntity.ok(comments);
    }
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId, @AuthenticationPrincipal User user) {
        // Assuming your CommentService has a method to delete a comment by ID
        commentService.delete(commentId, user);

        // Return a 204 No Content response to indicate successful deletion
        return ResponseEntity.noContent().build();
    }

}

