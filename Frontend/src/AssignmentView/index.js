import React, { useEffect, useRef } from 'react';
import { useLocalState } from '../util/useLocalStore';
import { useState } from 'react';
import ajax from "../Services/fetchService";
import { Badge, Button, ButtonGroup, Col, Container, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap'; 

const AssignmentView = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const assignmentId = window.location.href.split("/assignments/")[1];
    const [assignment, setAssignment] = useState({
        branch:"",
        githubUrl:"",   
        number: null,
        status: null,
    });
    const[assignmentEnums, setAssignmentEnums] = useState([]);
    const[assignmentStatues, setAssignmentStatues] = useState([]);

    const prevAssignmentValue = useRef(assignment);

      function updateAssignment(prop, value){
        const newAssignment = {...assignment};
        newAssignment[prop] = value;
        setAssignment(newAssignment);
    }

    
    function save(){
        // this implies that the student is sumbitting the assignment for the first time
        if(assignment.status === assignmentStatues[0].status){
            updateAssignment("status", assignmentStatues[1].status);
        }else{
            persist();  
        }

    }
    function persist(){
        ajax(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment)
        .then((assignmentData) => {
            setAssignment(assignmentData);
        });
    }
    useEffect(() =>{
        if(prevAssignmentValue.current.status !== assignment.status){
        }
        prevAssignmentValue.current=assignment;
    },[assignment])
    useEffect(() => {
        ajax(`/api/assignments/${assignmentId}`, "GET",jwt)
        .then((assignmentResponse) => {
            let assignmentData = assignmentResponse.assignment; 
            if(assignmentData.branch === null) assignmentData.branch="";
            if(assignmentData.githubUrl === null) assignmentData.githubUrl="";
            setAssignment(assignmentData);
            setAssignmentEnums(assignmentResponse.assignmentEnums);
            setAssignmentStatues(assignmentResponse.statusEnums);

        });
    }, []); 

    useEffect(()=>{
        console.log(assignmentEnums);
    },[assignmentEnums]);
    return (
        <Container className="mt-5">
            <Row className="d-flex align-items-center">
                <Col>
                {assignment.number ?  <h1>Assignment {assignment.number }  </h1> : <></>}
               
                </Col>
                <Col>        
                <Badge pill bg="info" style={{ fontSize:"1em"}}>
                {assignment.status}
                </Badge>
                </Col>
            </Row>
    
      
            {assignment ? (
                <>
                    <Form.Group as={Row} className="my-3" controlId="assignmentName">
                        <Form.Label column sm="3"   md="2">
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
                        <Form.Label column sm="3"   md="2">
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
                    <div className='d-flex gap-5'>
                    <Button onClick={() => save()}>
                        Sumbit Assignment
                    </Button>
                    <Button 
                    onClick={() => (window.location.href="/dashboard")}
                    size='lg'
                    variant='secondary'>
                        Back
                    </Button>
                    </div>
 
                </> 
            ) : (   
                <></>
            )}
        </Container>
    );
};

export default AssignmentView;
