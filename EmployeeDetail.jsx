/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import axios from 'axios'; 
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';

function EmployeeDetail() {
    const {id} = useParams();
    const navigate = useNavigate()
    const [employee, setEmployee] = useState([])
    const [replays, setReplay] = useState([])
    useEffect(()=> {
        axios.get('http://localhost:3009/employee/detail/'+id)
        .then(result => {
            setEmployee(result.data[0])
    })
        .catch(err => console.log(err))
        ReplayRecords();
    }, [])
    const  ReplayRecords = () =>{
        axios.get('http://localhost:3009/employee/replay_records')
            .then(result => {
          if(result.data.Status){
            setReplay(result.data.Result)
          }else {
            alert(result.data.Error)
          }
                
            })
    
      }
    const handleLogout = () => {
		axios.get('http://localhost:3009/employee/logout')
		.then(result => {
            if(result.data.Status){
                localStorage.removeItem("valid")
                navigate('/')
            }
			
		}).catch(err => console.log(err));
	}

  return (
    <div>
        <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
            <img src={`http://localhost:3009/images/`+employee.image} alt="" className='empImg'/>
            <div className='d-flex align-items-center flex-column mt-5'>
                <h3>Name: {employee.name}</h3>
                <h3>Email: {employee.email}</h3>
                <h3>Salary: {employee.salary}</h3>
            </div>
            <div className="mt-3">
                <button className='btn btn-primary me-2'>Edit</button>
                <button className='btn btn-danger me-2' onClick={handleLogout}>Logout</button>
                <Link to="/add_leave" className="btn btn-success me-2">
       leave request
      </Link>
            </div>
        </div>
        <div className='mt-4 px-5 pt-3'>
        <h3>Message from admin</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Message</th>

            </tr>
          </thead> 
          <tbody>
           {
            replays.map(r =>(
              
              <tr>
                <td>{r.message}</td>
              </tr>
            ))
           }
          
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EmployeeDetail