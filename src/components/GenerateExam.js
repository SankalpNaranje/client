import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import Table from 'react-bootstrap/Table';
import "../styles/generateexam.css"
import {  useNavigate } from 'react-router-dom';

const GenerateExam = () => {
  const [examIds, setExamIds] = useState([]);
  const [selectedExamId, setSelectedExamId] = useState('');
  const [candidateCount, setCandidateCount] = useState(null);
  const [progress, setProgress] = useState(35); // State to control progress bar
  const [showDistributionButton, setShowDistributionButton] = useState(false);
  const [distributionData, setDistributionData] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    // Fetch exam IDs from the backend when the component loads
    const fetchExamIds = async () => {
      try {
        const response = await axios.get('http://localhost:8800/get-exam'); // Replace with your backend endpoint
        setExamIds(response.data); // Set the whole response array to examIds
      } catch (error) {
        console.error('Error fetching exam IDs:', error);
      }
    };

    fetchExamIds();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedExamId(event.target.value);
    setProgress(35); // Set progress to 20% when an exam ID is selected
  };

  const handleContinueClick = async () => {
    setProgress(70); // Update progress to 50% when "Continue" is clicked
    if (selectedExamId) {
      try {
        const response = await axios.get(`http://localhost:8800/count-candidates/${selectedExamId}`);
        setCandidateCount(response.data.count);
      } catch (error) {
        console.error('Error fetching candidate count:', error);
      }
    } else {
      alert("Please select an exam ID first.");
    }
  };

  const handleShuffleQuestionsClick = async () => {
    setProgress(100);
    if (selectedExamId) {
      try {
        const response = await axios.post(`http://localhost:8800/shuffle-questions/${selectedExamId}`);
        if (response.data.success) {
          alert('Questions shuffled and table created successfully!');
          setShowDistributionButton(true);  // Show "Show Distribution" button after success
        }
      } catch (error) {
        console.error('Error shuffling questions and creating the table:', error);
      }
    } else {
      alert("Please select an exam ID first.");
    }
  };

  const handleShowDistributionClick = async () => {
    if (selectedExamId) {
      try {
        const response = await axios.get(`http://localhost:8800/get-distribution/${selectedExamId}`);
        // Convert and format the date correctly
        const formattedData = response.data.map(item => {
          // Parse date and handle timezone issues
          const date = new Date(item.dob);
          // Extract the date part only (e.g., '2003-09-15')
          const formattedDate = date.toLocaleDateString('en-CA');
          return {
            ...item,
            dob: formattedDate
          };
        });
        setDistributionData(formattedData);
        setProgress(100); // Update progress to 100% when distribution data is loaded
      } catch (error) {
        console.error('Error fetching distribution data:', error);
      }
    }
  };
  const handleHomepage =()=>{
    history('/');
  }
  
  return (
    <div>
      <div className="progressbar">
        <ProgressBar now={progress} label={`${progress}%`} />
      </div>
      
      <h2 style={{"marginTop":"40px"}}>Select Examination</h2>

      <Form.Group controlId="examSelect" style={{width:'25rem'}}>
        <Form.Label>Select Exam ID</Form.Label>
        <Form.Control as="select" value={selectedExamId} onChange={handleSelectChange}>
          <option value="">Select an exam</option>
          {examIds.map((exam) => (
            <option key={exam.examid} value={exam.examid}>
              {exam.examid}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
        <br />
      <Button variant="primary" onClick={handleContinueClick}>
        Continue
      </Button>
      <div> <span style={{color:"red"}}>*</span>Click continue to load the candidates</div>

      <br />
      <Card className="mt-4" style={{ width: '25rem' }}>
        <Card.Body>
          <Card.Title>Total Candidates Registered</Card.Title>
          <Card.Text>
             {candidateCount !=null ? candidateCount : "Please Select Exam Id "}
          </Card.Text>
        </Card.Body>
      </Card>
         <Link to="/addcandidate">Add New Candidates</Link>
      
      <div className='warning'>
        <h5>Warning</h5>
        <ul>
            <li>This is a one-time procedure. Updation will not be considered. PROCEED CAREFULLY.</li>
            <li>Please verify Examination Id correctly before clicking on 'Shuffle Questions' Button. </li>
            <li>Please verify total number of candidates appearing for the respected examination correctly. </li>
            <li>Addition of new candidates is denied once proceed further.</li>
            <li>DO NOT RELOAD THE PAGE IN BETWEEN THE PROCESS</li>
            <li>DO NOT PRESS BACK BUTTON IN BETWEEN THE PROCESS</li>
        </ul>
      </div>
      <br />
      <Button variant="secondary" onClick={handleShuffleQuestionsClick}>
        Shuffle Questions
      </Button>
      <div> <span style={{color:"red"}}>*</span>Click continue to shuffle the questions</div>

      {showDistributionButton && (
        <div className='distribution'>
          <Button variant="success" onClick={handleShowDistributionClick}>
            Show Distribution Table
          </Button>
        </div>
      )}

      {distributionData.length > 0 && (
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              {Object.keys(distributionData[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {distributionData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, idx) => (
                  <td key={idx}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {showDistributionButton &&(
        
        <div className='completion'>
            <h5>Process Completed Successfully. </h5>
            <ul>
                <li>Questions have been shuffled and distributed among the candidates.</li>
                <li>To Begin the examination , click on 'Manage Examination'. </li>
            </ul>
            <Button variant="success" onClick={handleHomepage}>
            Continue to Home Page.
          </Button>
          <br />
        </div>
        
      )}
    </div>
  );
};

export default GenerateExam;
