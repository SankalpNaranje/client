import React from 'react'
import { useParams } from 'react-router-dom';

const AddCenters = () => {
const { examId } = useParams();
  return (
    <div>
      <h1>This is add centers page for Exam id :{examId} </h1>

    </div>
  )
}

export default AddCenters 
