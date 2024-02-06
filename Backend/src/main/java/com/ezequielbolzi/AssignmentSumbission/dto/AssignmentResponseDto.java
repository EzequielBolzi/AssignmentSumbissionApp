package com.ezequielbolzi.AssignmentSumbission.dto;

import com.ezequielbolzi.AssignmentSumbission.domain.Assignment;
import com.ezequielbolzi.AssignmentSumbission.enums.AssignmentEnum;
import com.ezequielbolzi.AssignmentSumbission.enums.AssignmentStatusEnum;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class AssignmentResponseDto {

    private Assignment assignment;
    public Assignment getAssignment() {
        return assignment;
    }
    private AssignmentEnum[] assignmentEnums = AssignmentEnum.values();


    private AssignmentStatusEnum[] statusEnums = AssignmentStatusEnum.values();
    public void setAssignment(Assignment assignment){
        this.assignment = assignment;
    }

    public AssignmentResponseDto(Assignment assignment) {
        super();
        this.assignment = assignment;
    }
    public AssignmentStatusEnum[] getStatusEnums() {
        return statusEnums;
    }

    public AssignmentEnum[] getAssignmentEnums (){
        return assignmentEnums;
    }

}
