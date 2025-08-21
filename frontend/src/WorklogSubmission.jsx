import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WorklogSubmission.css';

const WorklogSubmission = () => {
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setConfirmationVisible(true);
  };

  const confirmSubmission = () => {
    alert("Worklog submitted successfully!");
    setConfirmationVisible(false);
    navigate('/');
  };

  return (
    <div className="submission-container">
      <h2>Submit Worklog</h2>
      <button className="submit-btn" onClick={handleSubmit}>Submit Worklog</button>

      {confirmationVisible && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to submit the worklog?</p>
          <button className="confirm-btn" onClick={confirmSubmission}>Yes</button>
          <button className="cancel-btn" onClick={() => setConfirmationVisible(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default WorklogSubmission;
