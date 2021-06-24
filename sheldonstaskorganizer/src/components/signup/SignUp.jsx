import React,{ useState } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { auth, db } from '../../config/Config';

const SignUp = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registrationError, setRegistrationError] = useState('');
    const handleRegister=(e)=>{
        e.preventDefault();
        // console.log("name: ", name);
        // console.log("email: ", email);
        // console.log("password: ", password);
        auth.createUserWithEmailAndPassword(email, password)
            .then(cred=> db.collection('users')
                           .doc(cred.user.uid)
                           .set({
                               Name: name,
                               Email: email,
                               Password: password
                           })
                           .then(()=>{
                               setName('');
                               setEmail('');
                               setPassword('');
                               setRegistrationError('');
                               props.history.push('/login');
                           })
                           .catch(err=> setRegistrationError(err.message))
            ).catch(err=>setRegistrationError(err.message));
    }
    return (
        <Jumbotron fluid>
            <Container>
                <h1> Register </h1>
                <Form onSubmit={handleRegister}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control placeholder="Enter Name" value={name}
                            required onChange={(e)=>setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email}
                            required onChange={(e)=>setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password}
                            required onChange={(e)=>setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Sign Up!
                    </Button>
                    {registrationError &&   
                   <Form.Control.Feedback type='invalid'>
                        {registrationError}
                   </Form.Control.Feedback>
                  }
                    <Form.Text className="text-muted">
                        Already have an account? Just <Link to='/login'>Sign In!</Link>
                    </Form.Text>
                </Form>
            </Container>
        </Jumbotron>
    )
}

export default SignUp;
