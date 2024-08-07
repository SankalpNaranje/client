import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <br />
          <h5>Candidate</h5>
          <li style={{"textDecoration":"underline"}}><Link to="/addcandidate">Add New Candidates</Link></li>
          <li style={{"textDecoration":"underline"}}><Link to="/searchcandidate">Find Candidates</Link></li>
          <br />
          <h5>Exam</h5>
          <li style={{"textDecoration":"underline"}}><Link to="/addexam/create-exam">Add Exam Details</Link></li>
          <li style={{"textDecoration":"underline"}}><Link to="/searchcandidate">Generate Exam</Link></li>
        </ul>
      <div className="main-content">
        Welcome Team !
      </div>
      </div>
    </div>
  );
}

export default Dashboard;
