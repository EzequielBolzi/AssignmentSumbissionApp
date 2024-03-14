import{ useEffect } from 'react';
import { useState } from 'react';
import { useLocalState } from '../util/useLocalStore';
import {Button, Card, Col, Row } from 'react-bootstrap';
import StatusBadge from '../StatusBadge';
import {navigate, useNavigate} from "react-router-dom"; //Chequear en algun momento
import { useUser } from '../UserProvider';


const Dashboard = () => {
    const navigate = useNavigate();
    const user = useUser();
    const [assignments, setAssignments] = useState(null);
    
    useEffect(()=> {
        fetch("/api/assignments",{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.jwt}`,
            },
            method: "GET",
        })
        .then((response) => {
            if(response.status === 200) return response.json();
        })
        .then((assignmentsData) => {
            setAssignments(assignmentsData);
        });
        if (!user.jwt)window.location.href = "/login";
        
    }, [user.jwt]);

    function createAssignment(){    
        fetch("api/assignments", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.jwt}`,
            },
            method: "POST",
        })
        .then((response) => {
            if(response.status === 200) return response.json();
        })
        .then((assignment) => {
            window.location.href = `/assignments/${assignment.id}`;
            
        });
    }
    return (
        <div style={{marginTop: "2em", marginLeft:"2em",marginRight:"2em"}}> 
            <Row>
                <Col>
                <div 
                className='d-flex justify-content-end'
                    style={{cursor:"pointer"}}
                    onClick={() => {
                    user.setJwt(null);
                }}>
                    Logout
                </div>
                </Col>
            </Row>
                <div className='mb-5'>
                    <Button size='lg' onClick={() => createAssignment()}>Submit New Assignment</Button>
                </div>
            {assignments ? (
                <Row>
                {assignments.map((assignment) => (
                    <Col>
                    <Card key={assignment.id} style={{ width: "18rem", height: "18rem"}}>
                        <Card.Body className='d-flex flex-column justify-content-around'>
                            <Card.Title>Assignment # {assignment.number}</Card.Title> 
                            <div className='d-flex align-items-start'>
                                <StatusBadge text={assignment.status}/>
                            </div>

                            <Card.Text>
                                <p><b>GitHub URL</b>: {assignment.githubUrl}</p>
                                <p><b>Branch</b>:{assignment.branch}</p>

                            </Card.Text>
                            <Button 
                                variant='secondary'
                                onClick={()=>{
                                    window.location.href = `/assignments/${assignment.id}`;
                                }}>
                                Edit
                            </Button>
                            
                        </Card.Body>
                    </Card>

                    </Col>



                    //<Link to={`/assignments/${assignment.id}`}>
                          //  Assignment ID: {assignment.id}
                   // </Link>
                
                        ))}
                </Row>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Dashboard;