import {useEffect, useState} from "react"
import { Form, Jumbotron, Button, Row, Col, Container, Card} from "react-bootstrap";
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

    let mapInvites = () => {
        if(Object.keys(friends).length > 0) {
            if(Object.keys(friends[props.userId]["friends"]).length == 1) {
                return (
                    <>
                    {[friends[props.userId]["friends"]].map((friend, id) => {
                        console.log(friend[Object.keys(friend)[0]][0])
                        console.log(friend[Object.keys(friend)[0]][1])
                        if(!friend[Object.keys(friend)[0]][0] && friend[Object.keys(friend)[0]][1] == 1)
                        return(
                        <Card body>
                                        <Row>
                            <Col sm = {10}>
                            <div>
                                <a>
                                    {friends[Object.keys(friend)[0]].first_name} {friends[Object.keys(friend)[0]].last_name}
                                    </a>
                                    </div>
                                    </Col>
                                    
                        <Col sm = {1}>
<FontAwesomeIcon icon={faTimesCircle} />
                        </Col>
                        <Col sm = {1}>
                        <FontAwesomeIcon icon={faCheckCircle} />
                        </Col>
                                    
                        </Row>
    
                        </Card>

                        )
                    })}
    
                    </>
                )
            }
            else {
                return (
                    <>
                    {friends[props.userId]["friends"].map((friend, id) => {
                        <h1>Mom</h1>
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
                let myData = {}
                myData[friendEmailParsed] = [false, 0] 
                console.log(props.userId)
                let friendData = {}
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
        <Col sm = {2} />
        <Col sm ={4}>
            <h1>Pending Invites</h1>
        <div style={{maxHeight:"50vh"}}>
        {mapInvites()}
        </div>
        </Col>
        </Row>
        </Jumbotron>
    )
}