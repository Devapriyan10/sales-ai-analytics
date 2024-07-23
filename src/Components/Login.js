import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    try {
      const response = await axios.post('http://localhost:8000/login', { email, password });
      if (response.data.success) {
        navigate('/home'); // Redirect to home page on successful login
      } else {
        if (response.data.message === 'Incorrect password') {
          setPasswordError(response.data.message);
        } else if (response.data.message === 'Invalid email ID') {
          setEmailError(response.data.message);
        } else {
          setPasswordError('Invalid email or password');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response && error.response.data && error.response.data.message) {
        if (error.response.data.message === 'Incorrect password') {
          setPasswordError(error.response.data.message);
        } else if (error.response.data.message === 'Invalid email ID') {
          setEmailError(error.response.data.message);
        } else {
          setPasswordError('Invalid email or password');
        }
      } else {
        setPasswordError('An error occurred during login');
      }
    }
  };

  return (
    <div className="auth-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>
        <div>
          <label>Password</label>
          <div className="password-input-container">
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="toggle-password-btn"
            >
              <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
            </button>
          </div>
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="social-login">
        <button>
          <FontAwesomeIcon icon={faGoogle} /> Login with Google
        </button>
        <button>
          <FontAwesomeIcon icon={faFacebook} /> Login with Facebook
        </button>
      </div>
    </div>
  );
}

export default Login;
