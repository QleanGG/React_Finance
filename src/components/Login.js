import React, { useState, } from 'react';
import './formStyle.css'
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
      
      const access_token = res.data.access_token;
      localStorage.setItem('access_token', access_token);
      setMessage(res.data.message);

      const decoded = jwtDecode(access_token);
      console.log(decoded);

      const usernameFromToken = decoded.sub;
      console.log(usernameFromToken);

      login(access_token);
      navigate('/')
      
    } catch (error) {
      setMessage(error.response.data.message || 'An error occurred');
    }
  };

  return (
    <div style={{textAlign:'center'}}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className='search-btn' type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
