// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import WorklogForm from './WorklogForm';
import FancyWorklog from './FancyWorklog';
import WorklogSubmission from './WorklogSubmission';
import HeadEvaluation from './HeadEvaluation';
import Dashboard from './Dashboard';
import PendingWorks from './PendingWorks';
import AdminView from './AdminView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/worklog-form" element={<WorklogForm />} />
        <Route path="/fancy-worklog" element={<FancyWorklog />} />
        <Route path="/worklog-submission" element={<WorklogSubmission />} />
        <Route path="/head-evaluation" element={<HeadEvaluation />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pendingworks" element={<PendingWorks />} />
        <Route path="/admin-view" element={<AdminView />} />
      </Routes>
    </Router>
  );
}

export default App;
