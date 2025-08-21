import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FancyWorklog.css';

const FancyWorklog = () => {
  const location = useLocation(); // 🛠 Get data passed from WorklogForm
  const worklog = location.state || {}; // If no data, use an empty object

  const navigate = useNavigate();

  return (
    <div className="fancy-worklog">
      <h2>Worklog Submission</h2>
      <p><strong>Faculty Name:</strong> {worklog.facultyName || "N/A"}</p>
      <p><strong>Faculty ID:</strong> {worklog.facultyID || "N/A"}</p>
      <p><strong>Cluster:</strong> {worklog.cluster || "N/A"}</p>
      <p><strong>Type of Work:</strong> {worklog.typeOfWork || "N/A"}</p>
      <p><strong>Total Time Taken:</strong> {worklog.totalTime ? `${worklog.totalTime} hrs` : "N/A"}</p>
      <div className="worklog-buttons">
        <button className="edit-btn">Edit</button>
        <button className="submit-btn" onClick={() => navigate('/worklog-submission')}>Submit</button>
      </div>
    </div>
  );
};

export default FancyWorklog;
