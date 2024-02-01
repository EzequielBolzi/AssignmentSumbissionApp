import React, { useEffect } from 'react';
import { useLocalState } from '../util/useLocalStore';
import { useState } from 'react';

const AssignmentView = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const assignmentId = window.location.href.split("/assignments/")[1];
    const [assignment, setAssignment] = useState(null);

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
    }, [jwt, assignmentId]); // Add dependencies to the dependency array

    return (
        <div>
            <h1>Assignment {assignmentId}</h1>
            {assignment ? (
                <>
                    <h2>Status: {assignment.status}</h2>
                    <h3>
                        GitHub URL: <input type="url" id="gitHubUrl"/>
                    </h3>
                    <h3>
                        Branch: <input type="text" id="branch"/>
                    </h3>
                    <button>Sumbit Assignment</button>
                </> 
            ) : (
                <></>
            )}
        </div>
    );
};

export default AssignmentView;
