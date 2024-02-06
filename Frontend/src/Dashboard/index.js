import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocalState } from '../util/useLocalStore';
import { Link, Navigate } from 'react-router-dom'; // Import Link from react-router-dom
import ajax from "../Services/fetchService";
import { Button, Card } from 'react-bootstrap';



const Dashboard = () => {
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
        <div style={{ marginTop: "2em", marginLeft: "20px"}}>
            <div className='mb-5 text-right'>
            <Button size='lg' onClick={() => createAssignment()}>Submit New Assignment</Button>
            </div>
            {assignments ? (
                <div className="d-grip gap-3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))" }}>
                    {assignments.map((assignment) => (
                            <Card key={assignment.id} style={{ width: "18rem", height: "18rem" }}>
                                <Card.Body className="d-flex flex-column justify-content-around">
                                    <Card.Title>Assignment #{assignment.id}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{assignment.status}</Card.Subtitle>
                                    <Card.Text >
                                        <p><b>GitHub URL: </b>{assignment.githubUrl}</p>
                                        <p><b>Branch:</b> {assignment.branch}</p>
                                    </Card.Text>
                                    <Button 
                                        variant="secondary"
                                        onClick={() => {
                                        window.location.href = `/assignments/${assignment.id}`;
                                    }}>
                                        Edit
                                    </Button>
                                </Card.Body>
                            </Card> 

                    ))}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Dashboard;