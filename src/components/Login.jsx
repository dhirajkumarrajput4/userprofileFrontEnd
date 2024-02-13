import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../config'; // Assuming config.js is located in src directory

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
      console.log(response);
      if (response.status === 200) {
        setSuccessMessage('Login Successful');
        const jwtToken=  response.data.jwtToken
        // console.log(jwtToken);
         // Store the token in local storage
         localStorage.setItem('authToken', jwtToken);
        navigate('/user');
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage('Invalid email or password');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
        <h2>Login Page</h2>
          <div className="card">
         
            <div className="card-header">Login</div>
            <div className="card-body">
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder='Enter your password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
              </form>
              {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
              {successMessage && <p className="text-success mt-3">{successMessage}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
