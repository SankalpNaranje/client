import React, { useState } from 'react';
import axios from 'axios'

const Register = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async(e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Name:', name);
    console.log('Password:', password);

    if(!name || !password){
      alert('Please fill in all fields');
    }else{
      try {
        const res = await axios.post("http://localhost:8800/registeruser",{name,password});
        if(res.status === 201){
          alert("Registered Successfully!!");
        }
      } catch (error) {
          console.log(error);
          alert("Something Went Wrong")
      }
    }
  };

  return (
    <div>
      <h1>This is register page</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
