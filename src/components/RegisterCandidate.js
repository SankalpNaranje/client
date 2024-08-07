import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import "../styles/registercandidate.css";

const RegisterCandidate = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [examId, setExamId] = useState('');

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
        alert("Candidate Registration Successful ");
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

  return (
    <div className='registerCandidate'>
      <h1 style={{ textDecoration: "underline" }}>Registration of Verified Candidate</h1>
      <div className="register-with-csv">
        <span>(Registration with csv will be added here !)</span>
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
    </div>
  );
}

export default RegisterCandidate;
