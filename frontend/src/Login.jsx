import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'faculty@gmail.com' && password === 'faculty') {
      navigate('/worklog-form');
    } else if (email === 'head@gmail.com' && password === 'head') {
      navigate('/head-evaluation');
    } else if (email === 'admin@gmail.com' && password === 'admin') {
      navigate('/admin-view');
    } else {
      alert('Invalid login credentials');
    }
  };

  return (
    <div className="login-outer-container">
      <div className="login-container">
        <h1 className="login-title">Faculty Worklog Portal</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
