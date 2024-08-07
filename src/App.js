import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Navbars from './components/Navbar';
import RegisterCandidate from './components/RegisterCandidate';
import Addexam from './components/Addexam';
import Addquestions from './components/Addquestions';
import AddCenters from './components/AddCenters';

function App() {
  return (
    <Router>
      <Navbars/>
      <div className="App" style={{ paddingTop: '60px' }}>
        <div className="app-left">
        <Dashboard/>
        </div>
        <div className="app-right">
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/addcandidate" element={<RegisterCandidate/>} />
          <Route exact path="/addexam/create-exam" element={<Addexam/>} />
          <Route exact path="/addexam/create-questions/:examId/:questions" element={<Addquestions/>} />
          <Route exact path="/addexam/create-questions/:examId/exam-centers" element={<AddCenters/>} />

        </Routes>
        </div>

      </div>

    </Router>
  );
}

export default App;
