import React from 'react'
import { useState } from 'react'
import { useEffect} from 'react'
import axios from 'axios'



const Home = () => {

    const [users, setUsers] = useState([])
    useEffect(()=>{
        const fetchAllUsers = async()=>{
            try{
                const res = await axios.get("http://localhost:8800/users")
                setUsers(res.data)
                console.log(res)
                console.log(res.status)
            }
            catch{
                console.log("Error")
            }
        }
        fetchAllUsers()
    },[])

  return (
    <div>
      <h1>This is home page</h1>
      <div className="users">
        {users.map(user=>(
            <div className="user">
                <h2>{user.name}</h2>
                <h2>{user.password}</h2>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Home
