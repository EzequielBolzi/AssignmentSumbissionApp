import React, { useState } from 'react';
import { useUser } from '../UserProvider';
import { Navigate, useLoaderData, useNavigate } from 'react-router-dom';
import { useLocalState } from '../util/useLocalStore';
import ajax from '../Services/fetchService';



const PrivateRoute =  (props) => {
    const user = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(null);
    const {children} = props;
    

    if(user){
    ajax (`/api/auth/validate?token=${user.jwt}`, "get", user.jwt).then(isValid => {
        setIsValid(isValid);
        setIsLoading(false);
    });
    }else{
        return    <Navigate to= "/login"></Navigate>

    }

    return isLoading ? ( 
    <div>Loading...</div> )
    : 
    isValid === true ?
    ( children)
     : 
     <Navigate to= "/login"></Navigate>
    };

export default PrivateRoute;