import {useState} from "react"
import { Jumbotron, Button } from "react-bootstrap";
import { Redirect } from "react-router";

export default function Landing(props) {

    const [submitted, setSubmitted] = useState(false)

    let startedSubmit = (e) => {
        e.preventDefault()
        setSubmitted(true)
        
    }

    return (
        <>
        <Jumbotron style={{height:"100vh"}}>
            <h1>Welcome to Bolt!</h1>
            <p>The platform to compete with <b>your family and friends.</b></p>
            <Button onClick={startedSubmit}>Let's Get Started!</Button>
        </Jumbotron>
        {submitted ? <Redirect to="/signup" /> : null}
        {props.loggedIn ? <Redirect to="/home" /> : null}

        </>
        
    )
}