import axios from 'axios';
import React, { useState } from 'react'
import { Button, Col, Container, Form, Row,} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../axios';

function Register() {

    const [validated, setvalidated] = useState(false);
    const [userFullName, setuserFullName] = useState('');
    const [userEmail, setuserEmail] = useState('');
    const [userPassword, setuserPassword] = useState('');

    const navigate = useNavigate();

    const handleFormSubmit = async (e)=> {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }else{
            try {
                let res = await instance.post('/api/v1/register', {
                    fullname:userFullName,
                    email:userEmail,
                    password:userPassword
                });

                console.log(res);

                if(res.data.success){
                    toast.success(res.data.message, {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        });

                        await new Promise((resolve) => setTimeout(resolve, 2000));

                        navigate('/login');
                }else{
                    toast.error(res.data.message)
                }

            } catch (error) {
                toast.error(error.response.data.message);
            }

        }

        setvalidated(true);
    }

    const handleUserFullName = (e)=> {
        setuserFullName(e.target.value);
    }

    const handleUserEmail = (e)=> {
        setuserEmail(e.target.value);
    }

    const handleUserPassword = (e)=> {
        setuserPassword(e.target.value);
    }

  return (
    <Container>
        <Row>
            <Col className='mt-3'>
                <h3>Register</h3>
            </Col>
        </Row>
        <Row>
            <Col className='mt-3'>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
            <ToastContainer position='top-center'/>
                <Form.Group className='mb-3'>
                    <Form.Label>Full Name:</Form.Label>
                    <Form.Control type="text" placeholder='Enter Full Name' className='rounded'onChange={(e)=>handleUserFullName(e)} required/>
                    <Form.Control.Feedback type='invalid'>Please enter your fullname</Form.Control.Feedback>
                    <Form.Control.Feedback type='valid'>Name Looks Good</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder='Enter your email' className='rounded' onChange={(e)=>handleUserEmail(e)} required/>
                    <Form.Control.Feedback type='invalid'>Please enter a valid email</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder='Enter Password' className='rounded'onChange={(e)=>handleUserPassword(e)} required/>
                    <Form.Control.Feedback type='invalid'>Please enter a valid Password</Form.Control.Feedback>
                </Form.Group>
                
                <Button variant='primary' type='submit'>Register</Button>
            </Form>
            </Col>
        </Row>
    </Container>
  )
}

export default Register