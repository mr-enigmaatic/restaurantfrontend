import React from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import RestaurantDelete from './RestaurantDelete';
import { BorderColor } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function Restaurants() {
    const restaurants = useSelector((state) => state.data.restaurants);

    return (
        <Container>
            <Row>
                <Col className='mt-3'>
                    <h3>Restaurants</h3>
                </Col>
            </Row>
            <ToastContainer position='top-center' />
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Restaurant Name</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {restaurants && restaurants.map((restaurant, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{restaurant.name}</td>
                                    <td>
                                        <Link to={`/restaurant/${restaurant._id}`}><BorderColor /></Link>
                                    </td>
                                    <td><RestaurantDelete id={restaurant._id} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default Restaurants