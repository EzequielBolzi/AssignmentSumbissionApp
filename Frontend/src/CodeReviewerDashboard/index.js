import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocalState } from '../util/useLocalStore';
import ajax from "../Services/fetchService";
import { Button, Card, Row, Col, Container } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";
import StatusBadge from '../StatusBadge';
import {  useNavigate } from "react-router-dom";
import { useUser } from '../UserProvider';



const CodeReviewerDashboard = () => {
    const navigate = useNavigate();
    const user = useUser();
    const [assignments, setAssignments] = useState(null);
    
    useEffect(() => {
        if (!user.jwt)  window.location.href ="/login";
      });
    function editReview(assignment){
        window.location.href = `/assignments/${assignment.id}`;
        ;
    }
    useEffect(() => {
        ajax("/api/assignments", "GET", user.jwt)
            .then((assignmentsData) => {
                setAssignments(assignmentsData);
            })
            .catch((error) => {
                console.error("Error fetching assignments:", error);
                // Handle the error as needed (e.g., show an error message to the user)
            });
    }, [user.jwt]);

    function claimAssignment(assignment){
        const decodedJwt = jwtDecode(user.jwt);
        const currentUser = {  
            id: null,
            username: decodedJwt.sub,
                };
        assignment.codeReviewer = currentUser;
        assignment.status= "In Review";
        ajax(`/api/assignments/${assignment.id}`, "PUT", user.jwt, assignment).then(
            //TODO" Update the view for the assignment that changed
            (updateAssignment) => {
            const assignmentsCopy = [...assignments];
            const i = assignmentsCopy.findIndex(a => a.id === assignment.id);
            assignmentsCopy[i] = updateAssignment;
            setAssignments(assignmentsCopy);
        }
        );
    }


    return (
        <Container>
            <Row>
                <Col>
                    <div 
                        className='d-flex justify-content-end'
                        style={{cursor: "pointer"}}
                         onClick={()=> {
                            user.setJwt(null);
                            window.location.href = "/login";
                        }}>
                            Logout
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                <div className='h1'> Code Reviewer Dashboard</div>
                </Col>
            </Row>
            <div className='assignment-wrapper  in-review'> 
            <div className='h3 px-2 assignment-wrapper-tittle' > In Review</div>
            {assignments && assignments.filter(assignment => assignment.status === "In Review").length > 0  ? (
                <div className="d-grip gap-3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))" }}>
                    {assignments.filter(assignment => assignment.status === "In Review").map((assignment) => (
                            <Card key={assignment.id} style={{ width: "18rem", height: "18rem" }}>
                                <Card.Body className="d-flex flex-column justify-content-around">
                                    <Card.Title>Assignment #{assignment.number}</Card.Title>
                                    <div className='d-flex align-items-start'>
                                    <StatusBadge text={assignment.status}/>

                                    </div>
                                    <Card.Text >
                                        <p><b>GitHub URL: </b><p>{assignment.githubUrl}</p></p>
                                        <p><b>Branch:</b> <p>{assignment.branch}</p></p>
                                    </Card.Text>
                                    <Button
                                        variant='secondary'
                                        onClick={()=>
                                        {
                                            editReview(assignment);
                                        }}
                                        >
                                            Edit
                                    </Button>
                                </Card.Body>
                            </Card> 

                    ))}
                </div>
            ) : (
                <div>No assignments found</div>
            )}
            </div>
            <div className='assignment-wrapper  sumbitted'>
            <div className='h3 px-2 assignment-wrapper-tittle' >Awaiting review</div>

                {assignments  && assignments.filter(assignment => assignment.status === "Sumbitted" || assignment.status === "Resumbitted").length > 0 ? (
                <div className="d-grip gap-3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))" }}>
                    {assignments.filter(assignment => assignment.status === "Sumbitted" || assignment.status === "Resumbitted")
                    .sort((a,b) => {
                        if (a.status === "Resumbitted")
                            return -1;
                        else
                        return 1;
                    })
                    .map((assignment) => (
                            <Card key={assignment.id} style={{ width: "18rem", height: "18rem" }}>
                                <Card.Body className="d-flex flex-column justify-content-around">
                                    <Card.Title>Assignment #{assignment.number}</Card.Title>
                                    <div className='d-flex align-items-start'>
                                    <StatusBadge text={assignment.status}/>

                                    </div>
                                    <Card.Text >
                                        <p><b>GitHub URL: </b><p>{assignment.githubUrl}</p></p>
                                        <p><b>Branch:</b> <p>{assignment.branch}</p></p>
                                    </Card.Text>

                                    <Button
                        variant="secondary"
                        onClick={() => {
                          claimAssignment(assignment);
                        }}
                      >
                        Claim
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
                </div>
            ) : (
                <div>No assignments found</div>
            )}
             </div>

            <div className='assignment-wrapper needs-update'>
            <div className='h3 px-2 assignment-wrapper-tittle' >Needs Update</div>

                {assignments && assignments.filter(assignment => assignment.status === "Needs Update").length > 0 ? (
                <div className="d-grip gap-3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))" }}>
                    {assignments.filter(assignment => assignment.status === "Needs Update").map((assignment) => (
                            <Card key={assignment.id} style={{ width: "18rem", height: "18rem" }}>
                                <Card.Body className="d-flex flex-column justify-content-around">
                                    <Card.Title>Assignment #{assignment.number}</Card.Title>
                                    <div className='d-flex align-items-start'>
                                    <StatusBadge text={assignment.status}/>

                                    </div>
                                    <Card.Text >
                                        <p><b>GitHub URL: </b><p>{assignment.githubUrl}</p></p>
                                        <p><b>Branch:</b> <p>{assignment.branch}</p></p>
                                    </Card.Text>
                                    <Button
                                        variant='secondary'
                                        onClick={()=>
                                        {
                                            claimAssignment(assignment);
                                        }}
                                        >
                                            Claim
                                    </Button>
                                </Card.Body>
                            </Card> 

                    ))}
                </div>
            ) : (
                <div>No assignments found</div>
            )}

            </div>
            
        </Container>
    );
};

export default CodeReviewerDashboard;