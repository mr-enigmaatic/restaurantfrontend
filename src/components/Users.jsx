import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { BorderColor} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserDelete from './UserDelete';
import instance from '../axios';

function Users() {

    const [users, setUsers] = useState([])

    useEffect(() => {

        const getAllUsers = async () => {

            try {

                const res = await instance.get("/api/v1/users",{withCredentials:true});
                setUsers(res.data.users);

            } catch (error) {
                toast.error(error.message);
            }

        }

        getAllUsers();


    }, []);   // added dependency array to avoid continues rendering


    return (
        <Container>
            <Row>
                <Col className='mt-3'>
                    <h3>Users</h3>
                </Col>
            </Row>
            <ToastContainer position='top-center'/>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.fullname}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link to={`/user/${user._id}`}><BorderColor/></Link>
                                    </td>
                                    <td><UserDelete id={user._id}/></td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default Users