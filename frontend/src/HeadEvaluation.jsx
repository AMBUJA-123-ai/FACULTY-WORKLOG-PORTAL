import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HeadEvaluation.css';

const HeadEvaluation = () => {
  const [worklogs, setWorklogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/worklogs')
      .then(response => setWorklogs(response.data))
      .catch(error => console.error("Error fetching worklogs:", error));
  }, []);

  const handleApproval = (id, status) => {
    axios.put(`http://localhost:5000/worklogs/${id}`, { status })
      .then(response => {
        setWorklogs(worklogs.map(log => log._id === id ? response.data : log));
      })
      .catch(error => console.error("Error updating worklog:", error));
  };

  return (
    <div className="evaluation-container">
      <h2>Evaluate Worklogs</h2>
      {worklogs.length > 0 ? (
        <table className="worklog-table">
          <thead>
            <tr>
              <th>Faculty Name</th>
              <th>Work Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {worklogs.map(log => (
              <tr key={log._id}>
                <td>{log.facultyName}</td>
                <td>{log.typeOfWork}</td>
                <td>{log.status}</td>
                <td>
                  <button onClick={() => handleApproval(log._id, 'Approved')}>Approve</button>
                  <button onClick={() => handleApproval(log._id, 'Rejected')}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No worklogs available.</p>
      )}
      <button className="submit-btn" onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
    </div>
  );
};

export default HeadEvaluation;
