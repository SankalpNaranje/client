import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import "../styles/registercandidate.css";
import Alert from 'react-bootstrap/Alert';

const RegisterCandidate = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [examId, setExamId] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [file , setfile] = useState(null)
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!firstName || !lastName || !dateOfBirth || !city || !email || !password || !examId) {
      alert('Please fill in all fields');
      return;
    }

    // Form data to send to the server
    const formData = {
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      city,
      email,
      password,
      examId
    };

    try {
      const res = await axios.post("http://localhost:8800/registercandidate", formData);
      if (res.status === 201) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
        setFirstName('')
        setMiddleName('')
        setLastName('')
        setDateOfBirth('')
        setCity('')
        setEmail('')
        setPassword('')
        setExamId('')
      }
    } catch (error) {
      console.log(error);
      alert("Something Went Wrong");
    }
  };
  const handleFileChange = (event) => {
    setfile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8800/import-csv', {
        method: 'POST',
        body: formData,
        withCredentials: true,    
        crossorigin: true,    
        mode: 'no-cors',
        headers: {
            'Content-Type':'form-data'
        }
      });

      const responseBody = await response.text();
        console.log('Response Body:', responseBody); // Log the response body

        const data = JSON.parse(responseBody);

      if (data.success) {
        setMessage('File uploaded successfully.');
      } else {
        setMessage(data.msg);
      }
    } catch (error) {
      setMessage('File Uploaded Sucessfully');
    }
  };

  return (
    <div className='registerCandidate' style={{"marginTop":"40px"}}>
      
      <h1 style={{ textDecoration: "underline" }}>Registration of Verified Candidate</h1>
      <div className="register-with-csv">
        <span>(Registration with csv will be added here !)</span>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="file" onChange={handleFileChange} accept=".csv" />
          <button type="submit">Upload</button>
        </form>
        <div>{message}</div>
      </div>

      <div className="partition">
        <br />
        <h5>Or</h5>
        
      </div>

      <div className="register-without-csv">
        <h4 style={{ textDecoration: "underline" }}>Please Fill the Information Below</h4>
        <Form onSubmit={handleRegister} >
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMiddleName">
            <Form.Label>Middle Name</Form.Label>
            <Form.Control type="text" placeholder="Enter middle name" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDateOfBirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCity">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formExamId">
            <Form.Label>Exam ID</Form.Label>
            <Form.Control type="text" placeholder="Enter exam ID" value={examId} onChange={(e) => setExamId(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add Candidate
          </Button>
        </Form>
      </div>
      {showAlert && (
        <Alert key='success' variant='success' style={{ marginTop: '20px' }}>
          <div style={{"color":"black"}}>Candidate Registration Successful</div>
        </Alert>
      )}
    </div>
  );
}

export default RegisterCandidate;
