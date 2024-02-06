import { Route, Routes } from "react-router-dom"
import './App.css';
import { useLocalState } from './util/useLocalStore';
import Dashboard from './Dashboard';
import Homepage from './Homepage';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import AssignmentView from './AssignmentView'; // Import AssignmentView
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");

  return (
    <Routes>
      <Route path="/dashboard" element={
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
      } />
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
