import React, { useState } from 'react'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import './AddRestaurant.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../axios';
import { useNavigate } from 'react-router-dom';


function AddRestaurant() {

    const [restaurantName, setRestaurantName] = useState('');
    const [restaurantAddress, setRestaurantAddress] = useState('');
    const [restaurantNeighborhood, setRestaurantNeighborhood] = useState('');
    const [restaurantPhotograph, setRestaurantPhotograph] = useState(null);

    const navigate = useNavigate();


    const [validated, setvalidated] = useState(false); 

    const handleRestaurantName = (e) => {
        setRestaurantName(e.target.value);
    }

    const handleRestaurantAddress = (e) => {
        setRestaurantAddress(e.target.value);
    }

    const handleRestaurantNeighborhood = (e) => {
        setRestaurantNeighborhood(e.target.value);
    }

    const handlePhotograph = (e) => {

        setRestaurantPhotograph(e.target.files[0]);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            
            const formData = new FormData();
            formData.append("name", restaurantName);
            formData.append("address", restaurantAddress);
            formData.append("neighborhood", restaurantNeighborhood);
            formData.append("photograph", restaurantPhotograph);

            try {
                const res = await instance.post('/api/v1/restaurant', formData, {
                    withCredentials: true,
                    headers: {
                        'content-type': 'multipart/form-data',
                    }
                });

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

                        navigate('/');
                }else{
                    toast.error(res.data.message)
                }

            } catch (error) {
                toast.error(error.response.data.message);
            }

        }

        setvalidated(true);

    }
    return (
        <Container>
            <Row>
                <Col className='mt-3'>
                    <h3>Add Restaurant</h3>
                    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                        <ToastContainer />
                        <Form.Group className='mb-3'>
                            <Form.Label>Restaurant Name:</Form.Label>
                            <Form.Control type="text" placeholder='Enter Restaurant Name' className='rounded' onChange={(e) => handleRestaurantName(e)} required />
                            <Form.Control.Feedback type='invalid'>Enter Valid Name</Form.Control.Feedback>
                            <Form.Control.Feedback type='valid'>Name Looks Good</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Restaurant Address:</Form.Label>
                            <Form.Control type="text" placeholder='Enter Restaurant Address' className='rounded' onChange={(e) => handleRestaurantAddress(e)} required />
                            <Form.Control.Feedback type='invalid'>Enter Valid Address</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Restaurant Neighborhood:</Form.Label>
                            <Form.Control type="text" placeholder='Enter Restaurant Neighborhood' className='rounded' onChange={(e) => handleRestaurantNeighborhood(e)} required />
                            <Form.Control.Feedback type='invalid'>Enter Valid Neighborhood</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId='formFile' className='mb-3 rounded'>
                            <Form.Label>Restaurant Photograph:</Form.Label>
                            <Form.Control type='file' onChange={(e) => handlePhotograph(e)} />
                        </Form.Group>
                        <Button variant='primary' type='submit'> Add Restaurant</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AddRestaurant