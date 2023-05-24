import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  }, [navigate]);

  async function handleLogin(e) {
    e.preventDefault();

    if (!email) {
      setEmailError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
    } else {
      setPasswordError('');
    }

    if (email && password) {
      try {
        const response = await axios.post('https://sore-erin-mackerel-sock.cyclic.app/login', {
          email,
          password,
        });
        Swal.fire({
          icon: 'success',
          title: 'Sign In successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
        if (response.data.auth) {
          const user = { email, password };
          const token = response.data.auth;

          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', JSON.stringify(token));
          navigate('/');
        } else {
          alert('Invalid email or password');
        }

        if (response.status === 200) {
          setEmail('');
          setPassword('');
          navigate('/');
        }
        console.log('response', response);
      } catch (error) {
        console.error('Error', error.response.data);
        Swal.fire({
          icon: 'error',
          title: 'Error sign in',
          text: error.message,
        });
      }
    }
  }

  return (
    <div className="App">
      <div>
        <h3 className="mt-4">Login</h3>
      </div>

      <Form>
        <div className="mt-4">
          <Form.Group className="mb-3 mx-auto" controlId="formBasicEmail">
            <Form.Control
              className="w-25 mx-auto"
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="error">
              {emailError && <p className="text-danger">{emailError}</p>}
            </div>
          </Form.Group>
        </div>
        <div className="mt-4">
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              className="w-25 mx-auto"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="error">
              {passwordError && <p className="text-danger">{passwordError}</p>}
            </div>
          </Form.Group>
        </div>
        <div className="justify-content-center d-flex mt-4">
          <Button
            onClick={(e) => handleLogin(e)}
            className="w-25"
            variant="primary"
            type="submit"
          >
            Sign In
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Login
