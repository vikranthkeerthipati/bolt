import {useEffect, useState} from "react"
import { Form, Jumbotron, Button, Row, Col, Container, Card, ListGroup} from "react-bootstrap";
import firebase from "../../firebase.js"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTimesCircle, faCheckCircle} from "@fortawesome/free-regular-svg-icons"


export default function MyFriends(props) {

    const [friendEmail, setFriendEmail] = useState("")
    const [friends, setFriends] = useState({})
    

    useEffect(() => {
        firebase.database().ref("users/").get()
        .then((response) => {
            let attrs = response.val()
            setFriends(attrs)
            console.log(attrs)
        })
    },[])


    let acceptFriend = (e, friend) => {
        e.preventDefault()
        console.log(friend)

    } 

    let friendsMap = () => {
        if(Object.keys(friends).length > 0) {
            
        }
        else {
            return(
                <>
                <ListGroup.Item>Test</ListGroup.Item>
                </>
            )
        }
    }
    let mapInvites = () => {
        if(friends[props.userId] != null && Object.keys(friends).length > 0) {
            console.log("no exist")
            if(friends[props.userId]["friends"] == null || friends == null) {
                return(
                    <>
                    <Card body>
                        <a>No Invites Found.</a>
                    </Card>
                    </>
                )
            }
            else {
                console.log("multiple")
                console.log(friends[props.userId]["friends"])
                let iterator = []
                Object.keys(friends[props.userId]["friends"]).forEach((friendName) => {
                    iterator.push(friendName)
                })

                return (
                    <>
                    {iterator.map((friendName) => {
                        if(friends[props.userId]["friends"][friendName])
                                                        <Card body>
                                                        <Row>
                                            <Col sm = {10}>
                                            <div>
                                                <a>
                                    {friends[friendName].first_name} {friends[friendName].last_name}
                                    </a>
                                                    </div>
                                                    </Col>
                                    {friends[props.userId]["friends"][friendName][0] == 1 ? 
                                    <>
                                        <Col sm = {1}>
                <FontAwesomeIcon style={{cursor: "pointer"}} icon={faTimesCircle} />
                                        </Col>
                                        <Col sm = {1}>
                                        <FontAwesomeIcon style={{cursor: "pointer"}} icon={faCheckCircle} onClick={(e) => acceptFriend(e, friendName)}/>
                                        </Col>
                                        </>
                    : <Col sm={2}><a>Sent!</a></Col>}  
                                        </Row>
                                                </Card>
            })}
                    </>
                )

            }
        }
        else {
            return(null)
        }
    }

    let addFriend = (e) => {
        e.preventDefault()

        firebase.database().ref("users/").get()
        .then((response) => {
            let attr = response.val()
            console.log(Object.keys(attr))
            let friendEmailParsed = friendEmail.replace(".","~")
            let myMail
            if(Object.keys(attr).includes(friendEmailParsed)) {
                let myData = friends[props.userId]["friends"]
                if(myData == null) {
                    myData = {}
                }
                myData[friendEmailParsed] = [false, 0] 
                console.log(props.userId)
                let friendData = friends[friendEmailParsed]["friends"]
                if(friendData == null) { 
                    friendData = {}
                }
                friendData[props.userId] = [false, 1]
                
                firebase.database().ref("users/"+props.userId+"/friends").set(
                    myData
                )
                firebase.database().ref("users/"+friendEmailParsed+"/friends").set(
                    friendData
                )
            }

        })

    }
    
    

    

    return (
        <Jumbotron>
            <Row>
                <Col sm = {4}>
                    <h1>Your Friends</h1>
                    <ListGroup>
                        {friendsMap()}
                    </ListGroup>
                </Col>
                <Col sm = {2} />
                <Col sm ={4}>
        <h1>Add Friends</h1>
        <Form>

        <Form.Group controlId="formBasicHours">
        <Form.Label>Your Friend's Email </Form.Label>
        <Form.Control onChange={(e) => setFriendEmail(e.currentTarget.value)}/>
        </Form.Group>
        <Button onClick={addFriend}>
            Submit
        </Button>
        </Form>
        </Col>
            </Row>
                    <Row>

        <Col sm = {6} />
        <Col sm ={4} className="mt-2">
            <h1>Pending Invites</h1>
        <div style={{maxHeight:"50vh"}}>
        {mapInvites()}
        </div>
        </Col>
        </Row>
        </Jumbotron>
    )
}