import { Route, Routes } from "react-router-dom"
import './App.css';
import { useLocalState } from './util/useLocalStore';
import Dashboard from './Dashboard';
import Homepage from './Homepage';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import AssignmentView from './AssignmentView'; // Import AssignmentView
import 'bootstrap/dist/css/bootstrap.min.css';import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import CodeReviewerDashboard from "./CodeReviewerDashboard";
import CodeReviewerAssignmentView from "./CodeReviewAssignmentView";
import { UserProvider, useUser} from "./UserProvider";




function App() {
  const user = useUser();
  const [roles, setRoles] = useState(getRolesFromJWT());

  useEffect(() => {
    setRoles(getRolesFromJWT());
  }, [user.jwt]);

  function getRolesFromJWT() {
    if (user.jwt) {
      const decodedJwt = jwtDecode(user.jwt);
      return decodedJwt.authorities || [];
    }
    return [];
  };
  return (
    <UserProvider>
    <Routes>
      <Route
        path="/dashboard"
        element={
          roles.find((role) => role === "CODE_REVIEWER") ? (
            <PrivateRoute>
              <CodeReviewerDashboard />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          )
        }
      />
      <Route
        path="/assignments/:assignmentId"
        element={
          roles.find((role) => role === "CODE_REVIEWER") ? (
            <PrivateRoute>
              <CodeReviewerAssignmentView />
            </PrivateRoute>
          ) : (
            <PrivateRoute>
              <AssignmentView />
            </PrivateRoute>
          )
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Homepage />} />
    </Routes>
    </UserProvider>
  );
} 

export default App;
