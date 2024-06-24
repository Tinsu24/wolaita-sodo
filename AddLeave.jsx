
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddLeave = () => {
  const [leave, setLeave] = useState({
    name: "",
    email: "",
    role: "",
  
  });
  const navigate = useNavigate()


  const handleSubmit = (e) =>{
    e.preventDefault()
  
    axios.post('http://localhost:3009/employee/add_leave', leave)
    .then(result => {
      if(result.data.Status) {
        navigate('/')
    } else {
        alert(result.data.Error)
    }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Request</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) =>
                setLeave({ ...leave, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>
                setLeave({ ...leave, email: e.target.value })
              }
            />
          </div>
          
          <div className="col-12">
            <label htmlFor="inputRole" className="form-label">
             role
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputRole"
              placeholder="Enter role"
              autoComplete="off"
              onChange={(e) =>
                setLeave({ ...leave, role: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeave;
