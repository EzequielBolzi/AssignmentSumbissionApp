package com.ezequielbolzi.AssignmentSumbission.repository;

import com.ezequielbolzi.AssignmentSumbission.domain.Assignment;
import com.ezequielbolzi.AssignmentSumbission.domain.Comment;
import com.ezequielbolzi.AssignmentSumbission.domain.User;
import com.ezequielbolzi.AssignmentSumbission.enums.AssignmentStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

    Set<Assignment> findByUser(User user);

    @Query("select a from Assignment a" +
            " where (a.status = 'sumbitted' and (a.codeReviewer is null or a.codeReviewer = :codeReviewer))"+
    "or a.codeReviewer = :codeReviewer")
    Set<Assignment> findByCodeReviewer(User codeReviewer);


}
