import React from 'react';
import { Navigate, useLoaderData } from 'react-router-dom';
import { useLocalState } from '../util/useLocalStore';

const PrivateRoute = ({children}) => {
    const [jwt, setJwt] = useLocalState("","jwt");
    return jwt ? children : <Navigate to="/login"/>;
};

export default PrivateRoute;