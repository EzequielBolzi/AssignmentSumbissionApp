import { Route, Routes } from "react-router-dom"
import './App.css';
import { useLocalState } from './util/useLocalStore';
import Dashboard from './Dashboard';
import Homepage from './Homepage';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import AssignmentView from './AssignmentView'; // Import AssignmentView
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import CodeReviewerDashboard from "./CodeReviewerDashboard";




function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [roles, setRoles] = useState(getRolesFromJWT());

  function getRolesFromJWT () {
    if(jwt){     const decodedJwt = jwtDecode(jwt);
      return decodedJwt.authorities;
    }
    return [];


  }

  return (
    <Routes>
      <Route 
       path="/dashboard"
       element={
        roles.find((role)=> role === "CODE_REVIEWER")  ? (
      <PrivateRoute>
        <CodeReviewerDashboard/>
      </PrivateRoute>) : (
      <PrivateRoute>
          <Dashboard/>
      </PrivateRoute>
      )
      }
       />
      <Route 
      path = "/assignments/:id"
      element={
        <PrivateRoute>
          <AssignmentView />
        </PrivateRoute>
        
      }        
      />
      <Route path="login" element={<Login />} /> 
      <Route path="/" element={<Homepage/>} />
    </Routes>
  );
} 

export default App;
