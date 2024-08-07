import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/addexam.css';
import axios from 'axios';

const Addexam = () => {
  const now = 25;
  const history = useNavigate()
  const [examId, setExamId] = useState('');
  const [examDate, setExamDate] = useState('');
  const [beginTime, setBeginTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState('');
  const [marksPerQuestion, setMarksPerQuestion] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    setTotalMarks(numberOfQuestions * marksPerQuestion);
  }, [numberOfQuestions, marksPerQuestion]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const formdata = {
      examId,
      examDate,
      beginTime,
      endTime,
      numberOfQuestions,
      marksPerQuestion,
      totalMarks,
      status,
    };

    if (!examId || !examDate || !beginTime || !endTime || !numberOfQuestions || !marksPerQuestion || !totalMarks || !status) {
      alert('Please fill in all fields');
    } else {
      try {
        const res = await axios.post("http://localhost:8800/addexam/create-exam", formdata);
        if (res.status === 201) {
          alert("Exam Created Successfully!!");
          const eid = examId;
          const questions = numberOfQuestions;
          setExamId('')
          setExamDate('')
          setBeginTime('')
          setEndTime('')
          setNumberOfQuestions('')
          setMarksPerQuestion('')
          setTotalMarks('')
          setStatus('')
          history(`/addexam/create-questions/${eid}/${questions}`);
          // eslint-disable-next-line
        }
      } catch (error) {
        console.log(error);
        alert("Something Went Wrong");
      }
    }
  };

  return (
    <div>
      <div className="progressbar">
        <ProgressBar now={now} label={`${now}%`} />
      </div>
      <div className="content">
        <h1>Create Examination</h1>
        
        <div className="register-without-csv">
          <h4 style={{ textDecoration: "underline" }}>Please Fill the Information Below</h4>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="formExamId">
              <Form.Label>Exam ID</Form.Label>
              <Form.Control type="text" placeholder="Enter exam ID" value={examId} onChange={(e) => setExamId(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formExamDate">
              <Form.Label>Exam Date</Form.Label>
              <Form.Control type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBeginTime">
              <Form.Label>Begin Time</Form.Label>
              <Form.Control type="time" value={beginTime} onChange={(e) => setBeginTime(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEndTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNumberOfQuestions">
              <Form.Label>Number of Questions</Form.Label>
              <Form.Control type="number" placeholder="Enter number of questions" value={numberOfQuestions} onChange={(e) => setNumberOfQuestions(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMarksPerQuestion">
              <Form.Label>Marks per Question</Form.Label>
              <Form.Control type="number" placeholder="Enter marks per question" value={marksPerQuestion} onChange={(e) => setMarksPerQuestion(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTotalMarks">
              <Form.Label>Total Marks</Form.Label>
              <Form.Control type="number" placeholder="Enter total marks" value={totalMarks} readOnly />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control type="text" placeholder="Enter status" value={status} onChange={(e) => setStatus(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">
              NEXT
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Addexam;
