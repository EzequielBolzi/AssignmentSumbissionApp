package com.ezequielbolzi.AssignmentSumbission.dto;

public class CommentDto {


    private long id;
    private long assignmentId;
    private String text;
    private String user;

    public long getAssignmentId() {
        return assignmentId;
    }

    public void setAssignmentId(Long assignmentId) {
        this.assignmentId = assignmentId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

}
