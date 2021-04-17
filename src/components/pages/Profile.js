import React, { useEffect, useState } from 'react'
import { Jumbotron, Row, Col, Button } from 'react-bootstrap'
import firebase from '../../firebase.js'; 

export default function Profile(props) {

    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    useEffect(() => {
        props.load(true)
        let user = firebase.auth().currentUser;
        let userId = user.uid;
        setEmail(user.email)
        firebase.database().ref('users/' + userId).get()
            .then((response) => {
                let attr = response.val()
                setFirstName(attr.first_name)
                setLastName(attr.last_name)
            })
        props.load(false)

    },[])



    return (
        <Jumbotron>
        <Row>
            <Col sm = {4}>
            <h1>My Profile</h1>
            </Col>
            <Col sm={6}></Col>
            <Col sm={2}>
                <Button>Edit</Button>
            </Col>
        </Row>
        <Row>
        <Col>
        <p>First Name</p>
        <h2>{firstName}</h2>
        </Col>
        <Col>
        <p>Last Name</p>
        <h2>{lastName}</h2>
        </Col>
        </Row>
        <Row>
            <Col>
            <p>Email Address</p>
            <h2>{email}</h2>
            </Col>
        </Row>

        </Jumbotron>
    )
}