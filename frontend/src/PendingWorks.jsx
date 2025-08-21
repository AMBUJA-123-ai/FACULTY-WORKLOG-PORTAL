import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PendingWorks.css';

const PendingWorks = () => {
  const [pendingWorklogs, setPendingWorklogs] = useState([]);

  useEffect(() => {
    const fetchWorklogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/worklogs");
        setPendingWorklogs(response.data);
      } catch (error) {
        console.error("Error fetching worklogs:", error);
      }
    };
    fetchWorklogs();
  }, []);

  return (
    <div className="pending-container">
      <h2>Pending Worklogs</h2>
      <table className="pending-table">
        <thead>
          <tr>
            <th>Faculty Name</th>
            <th>Work Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {pendingWorklogs.map((log) => (
            <tr key={log._id}>
              <td>{log.facultyName}</td>
              <td>{log.typeOfWork}</td>
              <td>{log.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingWorks;
