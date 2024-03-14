import React, { useEffect, useRef } from 'react';
import { useLocalState } from '../util/useLocalStore';
import { useState } from 'react';
import ajax from "../Services/fetchService";
import { Badge, Button, ButtonGroup, Col, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap'; 
import StatusBadge from '../StatusBadge';
import {navigate, useNavigate, useParams} from "react-router-dom";
import { useUser } from '../UserProvider';
import Comment from '../Comment';
import CommentContainer from '../CommentContainer';

const AssignmentView = () => {
    let navigate = useNavigate();
    const user = useUser();
    const {assignmentId} = useParams();
    const [assignment, setAssignment] = useState({
        branch:"",
        githubUrl:"",   
        number: null,
        status: null,
    });

    const [assignmentEnums, setAssignmentEnums] = useState([]);
    const [assignmentStatues, setAssignmentStatues] = useState([]);
    const prevAssignmentValue = useRef(assignment);

    function updateAssignment(prop, value){
        const newAssignment = {...assignment};
        newAssignment[prop] = value;
        setAssignment(newAssignment);
    }

    function save(status){
        if (status && assignment.status !== status){
            updateAssignment("status", status);
        }
    }

    function persist(){
        ajax(`/api/assignments/${assignmentId}`, "PUT", user.jwt, assignment)
        .then((assignmentData) => {
            setAssignment(assignmentData);
        });
    }

    useEffect(() => {
        if(prevAssignmentValue.current.status !== assignment.status){
            persist();
        }
        prevAssignmentValue.current = assignment;
    }, [assignment]);

    useEffect(() => {
        ajax(`/api/assignments/${assignmentId}`, "GET", user.jwt)
        .then((assignmentResponse) => {
            let assignmentData = assignmentResponse.assignment; 
            if(assignmentData.branch === null) assignmentData.branch="";
            if(assignmentData.githubUrl === null) assignmentData.githubUrl="";
            setAssignment(assignmentData);
            setAssignmentEnums(assignmentResponse.assignmentEnums);
            setAssignmentStatues(assignmentResponse.statusEnums);
        });
    }, []); 

    return (
        <Container className="mt-5">
            <Row className="d-flex align-items-center">
                <Col>
                    {assignment.number ? <h1>Assignment {assignment.number } </h1> : <></>}
                </Col>
                <Col>        
                    <StatusBadge text={assignment.status}/>
                </Col>
            </Row>
            {assignment ? (
                <>
                    <Form.Group as={Row} className="my-3" controlId="assignmentName">
                        <Form.Label column sm="3" md="2">
                        Assignment Number:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                        <DropdownButton
                                as={ButtonGroup}
                                variant={`info`}
                                title={assignment.number ?
                                     `Assignment ${assignment.number}` 
                                     : "Select an Assignment"}
                                onSelect={(selectedElement) => {
                                    updateAssignment("number", selectedElement)
                                }}
                        >
                            {assignmentEnums.map((assignmentEnum) => (
                                 <Dropdown.Item 
                                    key= {assignmentEnum.assignmentNum} eventKey={assignmentEnum.assignmentNum}>
                                    {assignmentEnum.assignmentNum}
                                    </Dropdown.Item>
                                    ))} 
                        </DropdownButton>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="my-3" controlId="githubUrl">
                        <Form.Label column sm="3" md="2">
                        GitHub URL:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                        <Form.Control
                         onChange={(e) => updateAssignment("githubUrl",e.target.value)}
                         type="url" 
                         value={assignment.githubUrl}
                         placeholder="https://github.com/username/repo-name" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="branch ">
                        <Form.Label column sm="3" md="2" >
                        Branch:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                        <Form.Control
                         onChange={(e) => updateAssignment("branch",e.target.value)}
                         type="text" 
                         value={assignment.branch}
                         placeholder="example_branch_main" />
                        </Col>
                    </Form.Group>
                    {assignment.status ==="Completed"? (
                        <>
                        <Form.Group as={Row} className="d-flex align-items-center mb-3" controlId="codeReviewVideoUrl">
                        <Form.Label column sm="3" md="2" >
                        Code Review Video Url:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                        <a href={assignment.codeReviewVideoUrl} style={{fontWeight: "bold"}}>
                            {assignment.codeReviewVideoUrl}
                        </a>
                        </Col>
                    </Form.Group>
                    <div className='d-flex gap-5'>
                        <Button 
                            onClick={() => {
                                window.location.href = "/dashboard";
                            }}
                            size='lg'
                            variant='secondary'>
                            Back
                        </Button>
                    </div>
                    </>
                    ): assignment.status === "Pending Sumbission" ? ( 
                    <div className='d-flex gap-5'>
                    <Button onClick={() => save("Sumbitted")}>
                        Sumbit Assignment
                    </Button>
                    <Button 
                        onClick={() => {
                            window.location.href = "/dashboard";
                        }}
                        size='lg'
                        variant='secondary'>
                        Back
                    </Button>
                    </div>
                    ): ( 
                    <div className='d-flex gap-5'>
                         <Button onClick={() => save("Resumbitted")}>
                            Resumbit Assignment
                        </Button>
                        <Button 
                            onClick={() => {
                                window.location.href = "/dashboard";
                            }}
                            size='lg'
                            variant='secondary'>
                            Back
                        </Button> 
                    </div>
                    )}
                    <CommentContainer assignmentId={assignmentId} />

                </> 
            ) : (   
                <></>
            )}
        </Container>
    );
};

export default AssignmentView;
