import {useEffect, useState} from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {Form, Jumbotron, Row, Col, Button} from "react-bootstrap"
import firebase from "../../firebase.js"
import MomentLocaleUtils, {
    formatDate,
    parseDate,
  } from 'react-day-picker/moment';
  import 'moment/locale/it';


export default function LogWorkout(props) {


    const [results, setResults] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date().getTime())
    const [hours, setHours] = useState(0)
    const [workoutType, setWorkoutType] = useState("HIIT & Crossfit")
    const [workoutDesc, setWorkoutDesc] = useState("")

    useEffect(() => {
        if(props.checkedUser && props.userId != null) {
        firebase.database().ref('users/' + props.userId).get()
        .then((response) => {
            let attr = response.val()
            if(attr != null && attr.results != null) {
                setResults(attr.results)
                console.log(attr.results)
            }

        })
    }
    },[props.checkedUser, props.userId])

    let addWorkout = (e) => {
        e.preventDefault()
        let final = results.push({"timestamp": selectedDate, "hours": hours, "workout_type":workoutType, "workout_description": workoutDesc})
        firebase.database().ref('users/' + props.userId + "/results").set(
            results
          );
        setResults(final)

    }

    return (
        <Jumbotron>

            <h1>Log Your Workout!</h1>
            <p>Enter the date, number of hours, type of workout, and workout description!</p>
            <Form id="logform">
            <Row>
                <Col sm={4} md={2}>
            <Form.Group controlId="formBasicDate" >
  <Form.Label>Date: </Form.Label>
  <br />
  <DayPickerInput   
            formatDate={formatDate}
        parseDate={parseDate}
        placeholder={`${formatDate(selectedDate)}`}
        onDayChange={day => setSelectedDate(new Date(day).getTime())} />
</Form.Group>
</Col>
<Col sm={2} md={1}>
<Form.Group controlId="formBasicHours">
  <Form.Label>Hours: </Form.Label>
  <Form.Control type="number" defaultValue={hours} onChange={(e) => setHours(e.currentTarget.value)}/>
</Form.Group>
</Col>
<Col sm={4} md={3}>
<Form.Group controlId="formWorkoutType">
  <Form.Label>Workout Type: </Form.Label>
  <Form.Control as="select" onChange={(e) => setWorkoutType(e.currentTarget.value)}>
    <option>HIIT & Crossfit</option>
    <option>Aerobic & Cardio</option>
    <option>Yoga & Pilates</option>
    <option>Strength Training</option>
    <option>Sports Training</option>
  </Form.Control>
</Form.Group>
</Col>
</Row>
<Row>
    <Col sm={10} md={6}>
<Form.Group controlId="formWorkoutType">
  <Form.Label>Workout Description: </Form.Label>
  <Form.Control as="textarea" onChange={(e) => setWorkoutDesc(e.currentTarget.value)}/>
</Form.Group>
</Col>
</Row>
<Button onClick={addWorkout}>
    Submit
</Button>
        </Form>
        </Jumbotron>
    )
}