import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="dashboard-options">
        <button onClick={() => navigate('/head-evaluation')} className="dashboard-btn">
          Evaluate Worklogs
        </button>
        <button onClick={() => navigate('/pendingworks')} className="dashboard-btn">
          View Pending Worklogs
        </button>
        <button onClick={() => navigate('/admin-view')} className="dashboard-btn">
          Admin View (Reports)
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
