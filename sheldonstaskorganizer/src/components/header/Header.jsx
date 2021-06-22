import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <Container fluid>
      <Navbar className='navbar-theme animate-navbar justify-content-between'
        collapseOnSelect
        expand="md"
        bg="dark"
        variant="dark"
        fixed='top'>
        <Navbar.Brand href="#home"> Sheldon's Task Organizer </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Container>
            <Row>
              <Col lg={4} md={12}>
                <Navbar.Text> Welcome <a href="#login">Name</a></Navbar.Text>
                <br />
                <Navbar.Text>Date: {new Date().toLocaleString() + ''} </Navbar.Text>
                <br />
                <Button variant='outline-warning'>
                  <Link to="/signup">Sign Up</Link>
                </Button>
                <br />
                <Button variant='outline-primary'>
                <Link to="/login">LogIn</Link>
                  
                </Button>
              </Col>
            </Row>
          </Container>


        </Navbar.Collapse>
      </Navbar>
    </Container>
  )
}

export default Header;
