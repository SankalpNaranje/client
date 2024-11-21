import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import "../styles/registercenter.css"; 
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

const AddCenters = () => {
  const now = 75;
  const history = useNavigate();
  const { examId }= useParams();
  const [ExamId, setExamId] = useState(examId);
  const [centerId, setCenterId] = useState('');
  const [centerName, setCenterName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleRegister = async (e) => {

    e.preventDefault();

    // Check for empty fields
    if (!centerId || !ExamId || !centerName || !city || !state || !country || !address || !pincode) {
      alert('Please fill in all fields');
      return;
    }

    // Form data to send to the server
    const formData = {
      centerId,
      ExamId,
      centerName,
      city,
      state,
      country,
      address,
      pincode,
    };

    try {
      const res = await axios.post("http://localhost:8800/addexam/registercenter", formData);
      if (res.status === 201) {
        // alert("Center Registration Successful");
          setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
        setCenterId('');
        setExamId('');
        setCenterName('');
        setCity('');
        setState('');
        setCountry('');
        setAddress('');
        setPincode('');
      }
    } catch (error) {
      console.log(error);
      alert("Something Went Wrong");
    }

  };
  const [centers, setCenters] = useState([])
  useEffect(()=>{
      const fetchAllCenters = async()=>{
          try{
              const res = await axios.get(`http://localhost:8800/getcenters/${examId}`)
              setCenters(res.data)
              console.log(res)
              console.log(res.status)
          }
          catch{
              console.log("Error")
          }
      }
      fetchAllCenters()
  },[])

  const handleClick = ()=>{
    history(`/addexam/conformation/${examId}`)
  }

  return (
    <div className='registerCenter'>
      {showAlert && (
        <Alert key='success' variant='success' style={{ marginTop: '20px' }}>
          <div style={{"color":"black"}}>Center Registration Successful</div>
        </Alert>
      )}
      <div className="progressbar">
        <ProgressBar now={now} label={`${now}%`} />
      </div>
      <h1 style={{ textDecoration: "underline" }}>Register New Center</h1>

      <br />
      <h4>Previous Scheduled Centers for ExamID {examId} </h4>
      <br />
      <div className="centers">
        {centers.map(center=>(
          <div key={center.centerId} className="centers">
            <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{center.centerid}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{center.center_name}</Card.Subtitle>
              <Card.Text>
              {center.city},{center.state}
              </Card.Text>
              {/* <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link> */}
            </Card.Body>
          </Card>
          </div>
        ))}
      </div>


      <div className="register-without-csv">
        <h4 style={{ textDecoration: "underline" }}>Please Fill the Information Below</h4>
        <Form onSubmit={handleRegister}>

          <div className="infocolumn1">
          <Form.Group className="mb-3 " controlId="formCenterId" style={{"margin":"15px"}}>
              <Form.Label>Center ID</Form.Label>
              <Form.Control type="text" placeholder="Enter Center ID" value={centerId} onChange={(e) => setCenterId(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formExamId" style={{"margin":"15px"}}>
              <Form.Label>Exam ID</Form.Label>
              <Form.Control type="text" placeholder="Enter exam ID" value={examId}  />
            </Form.Group>
          </div>

          <div className="infocolumn2" style={{"margin":"15px"}}>
          <Form.Group className="mb-3" controlId="formCenterName">
            <Form.Label>Center Name</Form.Label>
            <Form.Control type="text" placeholder="Enter center name" value={centerName} onChange={(e) => setCenterName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </Form.Group>
          </div>

          <div className="infocolumn1">
          <Form.Group className="mb-3" controlId="formCity" style={{"margin":"15px"}}>
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formState" style={{"margin":"15px"}}>
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="Enter state" value={state} onChange={(e) => setState(e.target.value)} />
          </Form.Group>

          </div>

          <div className="infocolumn1">
          <Form.Group className="mb-3" controlId="formCountry" style={{"margin":"15px"}}>
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" placeholder="Enter country" value={country} onChange={(e) => setCountry(e.target.value)} />
          </Form.Group>

          

          <Form.Group className="mb-3" controlId="formPincode" style={{"margin":"15px"}}>
            <Form.Label>Pincode</Form.Label>
            <Form.Control type="text" placeholder="Enter pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
          </Form.Group>

          </div>

          <div className="buttons">
          <Button variant="primary" type="submit" style={{"margin":"15px"}}>
            Register Center
          </Button>
          <Button variant="primary" onClick={handleClick} style={{"margin":"15px"}}>
            Next
          </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default AddCenters;
