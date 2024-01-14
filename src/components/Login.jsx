import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { authUserSuccess } from '../redux/userAuth';


function Login() {

  const [validated, setvalidated] = useState(false);
  const [userEmail, setuserEmail] = useState('');
  const [userPassword, setuserPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();

    } else {

      try {
        let res = await axios.post("http://localhost:5000/api/v1/login", {
          email: userEmail,
          password: userPassword,
        },{
          withCredentials:true
        });

        if (res.data.success) {

          if(res.data.isAuthenticated){
            dispatch(authUserSuccess({user:res.data.user, isAuthenticated:res.data.isAuthenicated}));
          }

          toast.success(res.data.message, {
            autoClose: 1000
          });

          await new Promise((resolve) => setTimeout(resolve, 1000));

          navigate("/");

        } else {
          toast.error(res.data.message);
        }
        
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }

    setvalidated(true);
  };

  const handleUserEmail = (e) => {
    setuserEmail(e.target.value);
  }

  const handleUserPassword = (e) => {
    setuserPassword(e.target.value);
  }

  return (
    <Container>
      <Row>
        <Col className='mt-3'>
          <h3>Login</h3>
        </Col>
      </Row>
      <Row>
        <Col className='mt-3'>
          <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              closeOnClick={true}
              pauseOnHover={true}
              draggable={true}
              progress={undefined}
              theme="colored" />

            <Form.Group className='mb-3'>
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" placeholder='Enter your email' className='rounded' onChange={(e) => handleUserEmail(e)} required />
              <Form.Control.Feedback type='invalid'>Please enter a valid email</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder='Enter Password' className='rounded' onChange={(e) => handleUserPassword(e)} required />
              <Form.Control.Feedback type='invalid'>Please enter a valid Password</Form.Control.Feedback>
            </Form.Group>

            <Button variant='primary' type='submit'>Login</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default Login