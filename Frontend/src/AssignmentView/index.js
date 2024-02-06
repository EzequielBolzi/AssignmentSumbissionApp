import React, { useEffect } from 'react';
import { useLocalState } from '../util/useLocalStore';
import { useState } from 'react';
import ajax from "../Services/fetchService";
import { Badge, Button, ButtonGroup, Col, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap'; // Import the necessary components

const AssignmentView = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const assignmentId = window.location.href.split("/assignments/")[1];
    const [assignment, setAssignment] = useState({
        branch:"",
        githubUrl:"",
    });

    function updateAssignmnets(prop, value){
        const newAssignment = {...assignment};
        newAssignment[prop] = value;
        setAssignment(newAssignment);
    }

    
    function save(){
        ajax(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment).then(
            (assignmentData) => {
                setAssignment(assignmentData);
            }
        );
    }
    useEffect(() => {
        ajax(`/api/assignments/${assignmentId}`, "GET",jwt)
        .then((assignmentData) => {
            if(assignmentData.branch === null) assignmentData.branch="";
            if(assignmentData.githubUrl === null) assignmentData.githubUrl="";

            setAssignment(assignmentData);
        });
    }, []); 

    return (
        <Container className="mt-5">
            <Row className="d-flex align-items-center">
                <Col>
                <h1>Assignment {assignmentId}  </h1>
                </Col>
                <Col>        
                <Badge pill bg="info" style={{ fontSize:"1em"}}>
                {assignment.status}
                </Badge>
                </Col>
            </Row>
    
      
            {assignment ? (
                <>
                    <h2>
                        Status: {assignment.status}
                    </h2>
                    <Form.Group as={Row} className="my-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="3"   md="2">
                        Assignment Number:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                        <DropdownButton
                            as={ButtonGroup}
                            id="assignmentName"
                            variant={`info`}
                            >
                            {['1','2','3','4','5','6'].map((assignmentNum) => (
                                 <Dropdown.Item eventKey={assignmentNum}>
                                    {assignmentNum}
                                    </Dropdown.Item>
                                    ))} 
                        </DropdownButton>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="my-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="3"   md="2">
                        GitHub URL:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                        <Form.Control
                         id="githubUrl"
                         onChange={(e) => updateAssignmnets("githubUrl",e.target.value)}
                         type="url" 
                         value={assignment.githubUrl}
                         placeholder="https://github.com/username/repo-name" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="3" md="2" >
                        Branch:
                        </Form.Label>
                        <Col sm="9" md="8" lg="6">
                        <Form.Control
                         id="branch"
                         onChange={(e) => updateAssignmnets("branch",e.target.value)}
                         type="text" 
                         value={assignment.branch}
                         placeholder="example_branch_main" />
                        </Col>
                    </Form.Group>

                    <Button onClick={() => save()}>Sumbit Assignment</Button>
                </> 
            ) : (   
                <></>
            )}
        </Container>
    );
};

export default AssignmentView;
