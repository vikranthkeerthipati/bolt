
import {useState} from "react"
import logo from '../../logo.svg';
import {Jumbotron, Row, Col, Form, Container, Button} from "react-bootstrap"
import firebase from '../../firebase.js'; 
import { Redirect } from 'react-router';


export default function Home(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)


  let signInSubmit = async (e) => {
    e.preventDefault()
    let user = await persistAndSignIn()
  }

  let persistAndSignIn = async () => {
    if(rememberMe) {
      console.log("remembering...")
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(async () => {
      await signIn()
      })

    } else {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(async () => {
        await signIn()
        })
    }

  }

  let signIn = async () => await firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log(user.uid)
    console.log("success!")
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });

    return (
      <>
      <Container>
          <Row style={{paddingTop:"5vh"}}>
            <Col />
            <Col md={8}>
            <h1>Welcome to Bolt!</h1>
            <h2>Sign in below!</h2>
            <Form>

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
<Form.Group controlId="formBasicCheckbox">
    <Form.Check onChange={(e) => setRememberMe(!rememberMe)} type="checkbox" label="Remember me?" />
    </Form.Group>
<Button variant="primary" type="submit" onClick={signInSubmit}>
  Sign In
</Button>
<Form.Text>Not signed up? <a href="/signup">Sign up</a></Form.Text>
</Form>
            </Col>
            <Col />
          </Row>
        </Container>
        {props.loggedIn ? <Redirect to="/leaderboard" /> : null}
        </>
      );
}