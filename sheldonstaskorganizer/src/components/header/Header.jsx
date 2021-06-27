import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { auth } from '../../config/Config';
import './Header.css';

const Header = (props) => {
  const { currentUser } = props;
  const handleLogout = () => {
    auth.signOut().then(window.location.reload());
  }
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
          <Navbar.Text>Date: {new Date().toLocaleString() + ''} </Navbar.Text>
          <br />
          {currentUser &&
            <Container>
              <Row>
                <Col md={12} lg={3}>
                <Navbar.Text> Welcome <a href="#login">{currentUser}</a></Navbar.Text>
                </Col>
              </Row>
              <Button variant='outline-danger' onClick={handleLogout}>Logout</Button>
            </Container>
          }
          {!currentUser &&
            <Container>
              <Button variant='outline-success'>
                <Link to="/signup">Sign Up</Link>
              </Button>
              <Button variant='outline-primary'>
                <Link to="/login">LogIn</Link>
              </Button>
            </Container>}
        </Navbar.Collapse>
      </Navbar>
    </Container>
  )
}

export default Header;
