import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './Header.css'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../redux/userAuth'
import cookies from 'js-cookie';

function Header() {

  const isAuthenticated = useSelector((state)=> state.auth.isAuthenticated);
  const user = useSelector((state)=> state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = ()=>{
    dispatch(userLogout());
    cookies.remove("token");
  } 
  
  return (
    <Navbar expand="lg" className="bg-dark">
      <Container>
        <Navbar.Brand as = {Link} to = "/">Taste of Palakkad</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as = {Link} to = "/">Home</Nav.Link>
            <Nav.Link as = {Link} to = "/about">About</Nav.Link>
            <Nav.Link as = {Link} to = "/services">Services</Nav.Link>
            <Nav.Link as = {Link} to = "/restaurants">Restaurants</Nav.Link>
            <Nav.Link as = {Link} to = "/add">Add Restuarant</Nav.Link>
            <Nav.Link as = {Link} to = "/users">Users</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
          
          {isAuthenticated ? 
          <Nav>
           <Button variant='secondary'>{user.fullname}</Button>
          <Button onClick={handleLogout}>logout</Button>
          </Nav> : 
          <Nav>
            <Nav.Link as = {Link} to = "/register"><Button variant='secondary'>Register</Button></Nav.Link>
            <Nav.Link as = {Link} to = "/login">
            <Button>Login</Button>
          </Nav.Link>
          </Nav>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
}

export default Header