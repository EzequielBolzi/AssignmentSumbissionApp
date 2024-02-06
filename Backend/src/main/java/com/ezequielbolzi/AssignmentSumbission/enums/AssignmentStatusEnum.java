package com.ezequielbolzi.AssignmentSumbission.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AssignmentStatusEnum {
    PENDING_SUMBISSION("Pending Sumbission",1),
    SUMBITTED("Sumbitted",2),
    IN_REVIEW("In Review",3),
    NEEDS_UPDATE("Needs Update",4),
    COMPLETED("Completed",5);



    private String status;
    private Integer step;
    AssignmentStatusEnum(String status, Integer step) {
        this.status=status;
        this.step=step;

    }
    public String getStatus() {
        return status;
    }
    public Integer getStep() {
        return step;
    }
}
