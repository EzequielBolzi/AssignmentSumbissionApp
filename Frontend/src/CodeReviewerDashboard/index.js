import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocalState } from '../util/useLocalStore';import ajax from "../Services/fetchService";
import { Button, Card, Badge, Row, Col, Container } from 'react-bootstrap';



const CodeReviewerDashboard = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [assignments, setAssignments] = useState(null);

    useEffect(() => {
        ajax("/api/assignments", "GET", jwt)
            .then((assignmentsData) => {
                setAssignments(assignmentsData);
            });
    }, [jwt]);

    function createAssignment() {
        ajax("api/assignments", "POST", jwt)
            .then((assignment) => {
                window.location.href = `/assignments/${assignment.id}`;
            });
    }

    return (
        <Container>
            <Row>
                <Col>
                    <div 
                        className='d-flex justify-content-end'
                        style={{cursor: "pointer"}}
                         onClick={()=> {
                            setJwt(null);
                            window.location.href = "/login"
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
            <div className='mb-5 text-right'>
            </div>
            {assignments ? (
                <div className="d-grip gap-3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))" }}>
                    {assignments.map((assignment) => (
                            <Card key={assignment.id} style={{ width: "18rem", height: "18rem" }}>
                                <Card.Body className="d-flex flex-column justify-content-around">
                                    <Card.Title>Assignment #{assignment.number}</Card.Title>
                                    <div className='d-flex align-items-start'>
                                    <Badge pill bg="info" style={{ fontSize: "1em"}}>
                                        {assignment.status}
                                    </Badge>
                                    </div>
                                    <Card.Text >
                                        <p><b>GitHub URL: </b>{assignment.githubUrl}</p>
                                        <p><b>Branch:</b> {assignment.branch}</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card> 

                    ))}
                </div>
            ) : (
                <></>
            )}
        </Container>
    );
};

export default CodeReviewerDashboard;