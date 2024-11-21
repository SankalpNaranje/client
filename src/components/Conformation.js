import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

const Conformation = () => {
  const now = 100;
  const [showAlert, setShowAlert] = useState(false);
  const history = useNavigate();
  const { examId } = useParams();

  const handleClick = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      history('/');
    }, 2000);
  };

  return (
    <div style={{ padding: '20px' }}>
      {showAlert && (
        <Alert key='success' variant='success' style={{ marginTop: '20px' }}>
          {/* <Alert.Heading style={{"color":"white"}}>Procedure completed Successfully</Alert.Heading> */}
          <div style={{"color":"black"}}>Procedure completed Successfully</div>
        </Alert>
      )}

      <div className="progressbar">
        <ProgressBar now={now} label={`${now}%`} />
      </div>

      <h2 style={{ marginTop: '20px' }}>Confirmation for Exam Creation</h2>
      <p>Exam ID: <strong>{examId}</strong></p>

      <div style={{ marginTop: '20px' }}>
        <h4>Actions Completed:</h4>
        <ul>
          <li>Exam Added Successfully</li>
          <li>Questions Added Successfully</li>
          <li>Centers Added Successfully</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px', color: 'red' }}>
        <h5>Important Notes:</h5>
        <ul>
          <li>No changes can be made to the data at this stage.</li>
          <li>This is just the exam creation process.</li>
          <li>Generation of the exam must be done by shuffling the questions according to the number of candidates for the exam to get scheduled.</li>
          <li>Center allocation for the candidates will be proceeded from GENERATE EXAM Tab.</li>
        </ul>
      </div>

      <Button variant="primary" onClick={handleClick} style={{ margin: "15px" }}>
        Submit
      </Button>
    </div>
  );
}

export default Conformation;
