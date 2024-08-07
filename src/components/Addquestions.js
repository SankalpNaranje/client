import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';

const AddQuestions = () => {
const now = 50
const history = useNavigate()
  const { examId, questions } = useParams();
  const numQuestions = parseInt(questions, 10);
  const [formData, setFormData] = useState({
    examId,
    questions: Array(numQuestions).fill(''),
    timeToComplete: Array(numQuestions).fill(''),
    answers: Array(numQuestions).fill('')
  });

  const handleInputChange = (index, field, value) => {
    const newFormData = { ...formData };
    newFormData[field][index] = value;
    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8800/addexam/addquestions', formData);
      if (res.status === 201) {
        console.log('Questions Added Successfully');
        alert('Questions added successfully');
        const eid = examId;
        setFormData('');
        history(`/addexam/create-questions/${eid}/exam-centers`);

      } else {
        console.log('Failed to add questions');
      }
    } catch (error) {
      console.error('Error adding questions', error);
    }
  };

  useEffect(() => {
    const createTable = async () => {
      try {
        const res = await axios.post('http://localhost:8800/addexam/create-questions-table', { examId });
        if (res.status === 201) {
          console.log('Table created successfully');
        } else {
          console.log('Failed to create table');
        }
      } catch (error) {
        console.error('Error creating table', error);
      }
    };

    createTable();
  }, [examId]);

  return (
    <div>
        <div className="progressbar">
        <ProgressBar now={now} label={`${now}%`} />
      </div>
      <h2>Creating Questions for Exam ID : {examId}</h2>
      <h4>Total Number of Questions: {questions}</h4>
      <Form onSubmit={handleSubmit}>
        {Array.from({ length: numQuestions }, (_, index) => (
          <div key={index}>
            <Form.Group className="mb-3">
              <Form.Label>Question {index + 1}</Form.Label>
              <Form.Control
                as="textarea"
                placeholder={`Enter question ${index + 1}`}
                value={formData.questions[index]}
                onChange={(e) => handleInputChange(index, 'questions', e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Time to Complete Question {index + 1} (in minutes)</Form.Label>
              <Form.Control
                type="number"
                placeholder={`Enter time to complete question ${index + 1}`}
                value={formData.timeToComplete[index]}
                onChange={(e) => handleInputChange(index, 'timeToComplete', e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Answer {index + 1}</Form.Label>
              <Form.Control
                as="textarea"
                placeholder={`Enter answer ${index + 1}`}
                value={formData.answers[index]}
                onChange={(e) => handleInputChange(index, 'answers', e.target.value)}
              />
            </Form.Group>
            <br />
            <hr />
          </div>
        ))}
        <Button variant="primary" type="submit">
          NEXT
        </Button>
      </Form>
    </div>
  );
};

export default AddQuestions;
