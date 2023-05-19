import React, { useState } from 'react';
import './signup.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

function SignUp() {

    const navigate = useNavigate();


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(()=>{
    const auth = localStorage.getItem('user')
    if(auth){
      navigate('/')
    }
  })


  async function handleSignUp(e) {
    e.preventDefault();

    console.log('This is signup form values', name, email, password);

    if (!name) {
      setNameError('Name is required');
    } else {
      setNameError('');
    }

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

    if (name && email && password) {
        try {
          const response = await axios.post('http://localhost:5000/register', {
            name,
            email,
            password,
          });
          Swal.fire({
            icon: 'success',
            title: 'sign up successfully!',
            showConfirmButton: false,
            timer: 1500
          });
          localStorage.setItem('user', JSON.stringify({email,name,password}));
          localStorage.setItem('token', JSON.stringify(response.data.auth));

          if (response.status === 200) {
            setName('');
            setEmail('');
            setPassword('');
            navigate('/');
          }
          console.log('response', response);
        } catch (error) {
          console.error('Error', error.response?.data);
          Swal.fire({
            icon: 'error',
            title: 'Error sign up',
            text: error.message
          });
        }
      }
            
    }


  

  return (
    <div className="App">
      <div>
        <h3 className="mt-4">Register</h3>
      </div>

      <Form>
        <div className="mt-4">
          <Form.Group className="mx-auto" controlId="formBasicText">
            <Form.Control
              className="w-25 mx-auto"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div className='error'>
              {nameError && <p className="text-danger">{nameError}</p>}
            </div>
          </Form.Group>
        </div>
        <div className="mt-4">
          <Form.Group className="mb-3 mx-auto" controlId="formBasicEmail">
            <Form.Control
              className="w-25 mx-auto"
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className='error'>
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
            <div className='error'>
              {passwordError && <p className="text-danger">{passwordError}</p>}
            </div>
          </Form.Group>
        </div>
        <div className="justify-content-center d-flex mt-4">
          <Button onClick={(e) => handleSignUp(e)} className="w-25 " variant="primary" type="submit">
            Sign Up
          </Button>
        </div>
      </Form>
    </div>
    )
    }
    export default SignUp
