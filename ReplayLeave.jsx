
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ReplayLeave = () => {
  const [replay, setReplay] = useState({
    message: "",
  
  
  });
  const navigate = useNavigate()


  const handleSubmit = (e) =>{
    e.preventDefault()
  
    axios.post('http://localhost:3009/auth/replay_leave', replay)
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
        <h3 className="text-center">Replay for Request</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
             message
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Message"
              onChange={(e) =>
                setReplay({ ...replay, message: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Replay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};



  
export default ReplayLeave