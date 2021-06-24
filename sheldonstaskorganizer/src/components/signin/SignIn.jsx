import React, { useState } from 'react';
import { auth } from '../../config/Config';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useHistory } from 'react-router-dom';

const SignIn = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const history = useHistory();
    const handleLogin = (e) => {
        e.preventDefault();
        // console.log("email: ", email);
        // console.log("password: ", password);
        auth.signInWithEmailAndPassword(email, password)
            .then(()=>{
                setEmail('');
                setPassword('');
                setLoginError('');
                history.push('/');
            }).catch(err=>setLoginError(err.message));
    }

    return (
        <Jumbotron fluid>
            <Container>
                <h1> Log In </h1>
                <Form onSubmit={handleLogin}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email}
                            required onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password}
                            required onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        LogIn!
                    </Button>
                    {loginError &&
                        <Form.Control.Feedback type='invalid'>
                            {loginError}
                        </Form.Control.Feedback>
                    }
                    <Form.Text className="text-muted">
                        Don't have an account? Just <Link to='/signup'>Sign Up!</Link>
                    </Form.Text>
                </Form>
            </Container>
        </Jumbotron>
    )
}

export default SignIn;