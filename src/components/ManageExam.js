import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

const ManageExam = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('http://localhost:8800/exams-with-setexam-tables');
        setExams(response.data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, []);

  const handleStartExam = async (examid) => {
    try {
      await axios.post(`http://localhost:8800/start-exam/${examid}`);
      setExams(exams.map(exam => 
        exam.examid === examid ? { ...exam, status: 'active' } : exam
      ));
    } catch (error) {
      console.error("Error starting the exam:", error);
    }
  };

  const handleEndExam = async (examid) => {
    const confirmEnd = window.confirm("Are you sure you want to end the exam? This will submit all ongoing exams.");
    if (confirmEnd) {
      try {
        await axios.post(`http://localhost:8800/end-exam/${examid}`);
        setExams(exams.map(exam => 
          exam.examid === examid ? { ...exam, status: 'submitted' } : exam
        ));
      } catch (error) {
        console.error("Error ending the exam:", error);
      }
    }
  };

  return (
    <div>
      <h1>Manage Examinations</h1>
      <br />
      <div className="exam-cards" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {exams.map(exam => {
          const examDate = moment(exam.examdate);
          const beginTime = moment(exam.begintime, "HH:mm:ss");
          const endTime = moment(exam.endtime, "HH:mm:ss");
          const now = moment();
          const timeRemaining = examDate.isAfter(now) ? moment.duration(examDate.diff(now)).humanize() : `Ready to begin exam at ${exam.begintime} Hrs`;

          let button;
          if (exam.status === 'deactive') {
            button = <Button variant="success" onClick={() => handleStartExam(exam.examid)}>Start Exam</Button>;
          } else if (exam.status === 'active') {
            button = <Button variant="danger" onClick={() => handleEndExam(exam.examid)}>End Exam</Button>;
          } else {
            button = <Button variant="secondary" disabled>Conducted</Button>;
          }

          return (
            <Card key={exam.examid} style={{ width: '30rem', marginBottom: '20px' }}>
              <Card.Body>
                <div style={{"borderBottom":" 2px solid #FC8C25","marginBottom":"10px"}}>
                    <Card.Title style={{"color":"#1272E8"}}>EXAM ID: {exam.examid}</Card.Title>
                </div>
                <Card.Text>
                  <strong>DATE:</strong> {examDate.format('YYYY-MM-DD')}<br />
                  <strong>START TIME (24 hour clock):</strong> {beginTime.format('HH:mm')} <br />
                  <strong>END TIME (24 hour clock):</strong> {endTime.format('HH:mm')} <br />
                  <strong>TIME REMAINING:</strong> {timeRemaining}<br />
                  <strong>STATUS:</strong> {exam.status}
                </Card.Text>
                {button}
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ManageExam;
