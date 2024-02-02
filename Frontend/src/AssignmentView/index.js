import React, { useEffect } from 'react';
import { useLocalState } from '../util/useLocalStore';
import { useState } from 'react';


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
        fetch(`/api/assignments/${assignmentId}`,{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "PUT",
            body: JSON.stringify(assignment)      
        }).then((response) => {if (response.status === 200) return response.json();
        })
          .then((assignmentData) => {
            setAssignment(assignmentData);
          });
    }
    useEffect(() => {
        fetch(`/api/assignments/${assignmentId}`, { // Use assignmentId in the URL
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "GET",      
        })
        .then((response) => {
            if (response.status === 200) return response.json();
        })
        .then((assignmentData) => {
            setAssignment(assignmentData);
        });
    }, []); 

    return (
        <div>
            <h1>Assignment {assignmentId}</h1>
            {assignment ? (
                <>
                    <h2>Status: {assignment.status}</h2>
                    <h3>
                        GitHub URL: <input type="url" id="githubUrl" onChange={(e) => updateAssignmnets("githubUrl",e.target.value)} value={assignment.githubUrl}/>
                    </h3>
                    <h3>
                        Branch: <input type="text" id="branch"onChange={(e) => updateAssignmnets("branch",e.target.value)} value={assignment.branch}/>
                    </h3>
                    <button onClick={() => save()}>Sumbit Assignment</button>
                </> 
            ) : (   
                <></>
            )}
        </div>
    );
};

export default AssignmentView;
