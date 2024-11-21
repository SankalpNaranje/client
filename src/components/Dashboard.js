import React from "react";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";
import HomeIcon from "@mui/icons-material/Home";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
// import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
// import PlagiarismIcon from '@mui/icons-material/Plagiarism';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <ul>
          {/* <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li> */}
          <li>
            <Link to="/">
              <div className="dashicons">
                <HomeIcon style={{ marginRight: "8px" }} />
                <span style={{"fontWeight":"bold"}}>WESHINE Dashboard</span>
              </div>
            </Link>
          </li>

          <br />
          <br />
          <h5 style={{ color: "#bd66f1" }}>Candidate</h5>
          <li>
            <Link to="/addcandidate">
              <div className="dashicons">
                <PersonAddAlt1Icon style={{ marginRight: "8px" }} />
                Add Candidate
              </div>
            </Link>
          </li>
          {/* <li>
            <Link to="/searchcandidate">
              <div className="dashicons">
                <PersonSearchIcon style={{ marginRight: "8px" }} />
                Search Candidate
              </div>
            </Link>
          </li> */}
          <br />
          <h5 style={{ color: "#bd66f1" }}>Examination</h5>

          <li>
            <Link to="/addexam/create-exam">
              <div className="dashicons">
                <AccountBalanceIcon style={{ marginRight: "8px" }} />
                Add Examination Details
              </div>
            </Link>
          </li>
          <li>
            <Link to="/generate-exam">
              <div className="dashicons">
                <PresentToAllIcon style={{ marginRight: "8px" }} />
                Generate Examination
              </div>
            </Link>
          </li>
          <li>
            <Link to="/manage-exam">
              <div className="dashicons">
                <ManageHistoryIcon style={{ marginRight: "8px" }} />
                Manage Examination
              </div>
            </Link>
          </li>
          {/* <li>
            <Link to="/search-exam">
              <div className="dashicons">
                <PlagiarismIcon style={{ marginRight: "8px" }} />
                Search Examination
              </div>
            </Link>
          </li> */}
        </ul>
        <div className="main-content" ><span style={{"fontWeight":"bold"}}> Welcome Team</span></div>
      </div>
    </div>
  );
};

export default Dashboard;
