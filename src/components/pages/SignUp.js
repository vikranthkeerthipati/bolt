import React, { useEffect, useState } from 'react';
import firebase from '../../firebase.js'; 
import {Form, Container, Row, Col, Button} from 'react-bootstrap'
import { Redirect } from 'react-router';

export default function SignUp(props) {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)

    let signUpSubmit = async (e) => {
      e.preventDefault()
      console.log(rememberMe)
      let user = await signUp()
    }

    let signUp = async () => {
          await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      let userId = user.email.replace(".","~")
      firebase.database().ref('users/' + userId).set({
        first_name: firstName,
        last_name: lastName
      });

    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      return errorMessage;
      // ..
    })
  }


      return(
        <>
          <Container>
            <Row style={{paddingTop:"5vh"}}>
              <Col />
              <Col md={8}>
              <h1>Welcome to Bolt!</h1>
              <h2>Sign up below!</h2>
              </Col>
              <Col />
            </Row>
            <Row>
              <Col></Col>
              <Col md={8}>
              <Form>
              <Form.Row>
    <Col>
    <Form.Label>First Name</Form.Label>
      <Form.Control onChange={(e) => setFirstName(e.currentTarget.value)}  placeholder="John" />
    </Col>
    <Col>
      <Form.Label>Last Name</Form.Label>
      <Form.Control onChange={(e) => setLastName(e.currentTarget.value)}  placeholder="Smith" />
    </Col>
  </Form.Row>

  
    <Form.Group controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control onChange={(e) => setEmail(e.currentTarget.value)} type="email" placeholder="Enter email" />
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>
    <Form.Group controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control onChange={(e) => setPassword(e.currentTarget.value)} type="password" placeholder="Password" />
    </Form.Group>
    <Form.Group controlId="formBasicPassword">
      <Form.Label>Confirm Password</Form.Label>
      <Form.Control onChange={(e) => setConfirmPassword(e.currentTarget.value)} type="password" placeholder="Confirm Password" />
    </Form.Group>
    <Form.Group controlId="formBasicCheckbox">
    <Form.Check onChange={(e) => setRememberMe(!rememberMe)} type="checkbox" label="Remember me?" />
    </Form.Group>
    <Button onClick={signUpSubmit} variant="primary" type="submit">
      Sign Up
    </Button>
    <Form.Text>Already signed up? <a href="/">Sign in</a></Form.Text>
    </Form>
    </Col>
  
  <Col></Col>
  </Row>
          </Container>
          {props.loggedIn ? <Redirect to="/logworkout" /> : null}
          </>
      )
  
  }
  