import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './WorklogForm.css';

const WorklogForm = () => {
  const [formData, setFormData] = useState({
    facultyName: '',
    facultyID: '',
    cluster: '',
    typeOfWork: '',
    totalTime: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/submit-worklog", formData);

      if (response.status === 201) {
        alert("Worklog submitted successfully!");
        
        // 🛠 Navigate to FancyWorklog page & pass data
        navigate('/fancy-worklog', { state: response.data.data });
      }
    } catch (error) {
      console.error("Error submitting worklog:", error);
      alert("Failed to submit worklog");
    }
  };

  return (
    <div className="worklog-container">
      <h1>Worklog Entry</h1>
      <form className="worklog-form" onSubmit={handleSubmit}>
        <input type="text" name="facultyName" placeholder="Faculty Name" value={formData.facultyName} onChange={handleChange} required />
        <input type="text" name="facultyID" placeholder="Faculty ID" value={formData.facultyID} onChange={handleChange} required />
        <select name="cluster" value={formData.cluster} onChange={handleChange} required>
          <option value="">Select Cluster</option>
          <option value="Academics">ACADEMICS</option>
          <option value="Training & Placement">TRAINING & PLACEMENT</option>
          <option value="Special Labs">SPECIAL LABS</option>
          <option value="Skill Training">SKILL TRAINING</option>
          <option value="ELCC">ELCC</option>
        </select>
        <input type="text" name="typeOfWork" placeholder="Type of Work" value={formData.typeOfWork} onChange={handleChange} required />
        <input type="number" name="totalTime" placeholder="Total Time Taken (hrs)" value={formData.totalTime} onChange={handleChange} required />
        <button type="submit" className="submit-btn">Submit Worklog</button>
      </form>
    </div>
  );
};

export default WorklogForm;
