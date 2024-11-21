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
import Conformation from './components/Conformation';
import GenerateExam from './components/GenerateExam';
import ManageExam from './components/ManageExam';

function App() {
  return (
    <>
    <Router>
      {/* <Navbars/> */}
      <div className="App">
        <div className="app-left">
        <Dashboard/>
        </div>
        <div className="app-right">
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/addcandidate" element={<RegisterCandidate/>} />
          <Route exact path="/generate-exam" element={<GenerateExam/>} />
          <Route exact path="/manage-exam" element={<ManageExam/>} />
          <Route exact path="/addexam/create-exam" element={<Addexam/>} />
          <Route exact path="/addexam/create-questions/:examId/:questions" element={<Addquestions/>} />
          <Route exact path="/addexam/create-centers/:examId/exam-centers" element={<AddCenters/>} />
          <Route exact path="/addexam/conformation/:examId" element={<Conformation/>} />

        </Routes>
        </div>

      </div>

    </Router>
    </>
  );
}

export default App;
