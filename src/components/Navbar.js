import React, {useEffect, useState} from 'react';
import {Navbar, Nav, Button } from 'react-bootstrap'
import {Link, Redirect} from 'react-router-dom';
import firebase from '../firebase.js'; 


export default function MainNavbar(props) {
  const [loggedOut, setLoggedOut] = useState(false)



  let signOut = (e) => {
      firebase.auth().signOut().then(() => {
          console.log("signed out")
          setLoggedOut(true)
        }).catch((error) => {
          console.log(error)
        });
  }

    return (
        <>
            <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">                    
    <Navbar.Brand href="/">
      Bolt
    </Navbar.Brand>
    {props.loggedIn ? <> 
    <Nav.Link href="/leaderboard">Your Leaderboard</Nav.Link>
    <Nav.Link href="/logworkout">Log Workouts</Nav.Link>
    <Nav.Link href="/myworkouts">My Workouts</Nav.Link>


    </>
: null
}
    
    <Nav.Link href="/contact">Contact</Nav.Link>

    </Nav>
    <Nav className="ml-auto">
            {props.loggedIn ? 
            <>
            <Nav.Link href="/myfriends">My Friends</Nav.Link>
            <Nav.Link href="/profile">My Profile</Nav.Link>
            <Button onClick={signOut} href="/">Sign Out</Button></> :
            <>
            <Button style={{marginRight:"2vh"}} href="/signin">Sign In</Button>
            <Button href="/signup">Sign Up</Button>
            </>
            }
            </Nav>
            
    </Navbar>
    </>
    )
}


