import { useEffect, useState } from "react";
import { Jumbotron } from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import firebase from "../../firebase.js"


const columns = [{
    dataField: 'timestamp',
    text: 'Date',
    sort: true,
    formatter: (cell) => {
        let dateObj = cell;
        if (typeof cell !== 'object') {
          dateObj = new Date(cell);
        }
        console.log(dateObj)
        return `${dateObj.toLocaleDateString("en-US")}`;}
  }, {
    dataField: 'workout_type',
    text: 'Workout Type',
    sort: true
  }, {
    dataField: 'hours',
    text: 'Hours',
    sort: true
  } , {
    dataField: 'workout_description',
    text: 'Workout Description',
  }


];
  
  const defaultSorted = [{
    dataField: 'timestamp',
    order: 'desc'
  }];

  const products = [{"timestamp":0, "name": "Test", "price":"$1.23"},{"timestamp":1, "name": "Dad", "price":"2.23"}]
  

export default function MyWorkouts(props) {

    const [workouts, setWorkouts] = useState(null)


  
    useEffect(() => {
        if(props.checkedUser) {
        firebase.database().ref('users/' + props.userId).get()
        .then((response) => {
            let attr = response.val()
            console.log(attr.results)
            if(attr != null && attr.results != null) {
                setWorkouts(attr.results)
            }
            else {
                setWorkouts([])
            }
            props.load(false)
        })
    }
    },[props.userId])


    let unloadedContent = () => {
        return (
            <>
        {props.userId != null && props.checkedUser && workouts != null ? <p>No workouts logged!</p> : props.load(true)} 
        </>

        )
    }

    return (
       <> 
        <Jumbotron>
            <h1>My Workouts</h1>
           {workouts != null && workouts.length > 0 ? <BootstrapTable
            bootstrap4
  keyField="timestamp"
  data={ workouts }
  columns={ columns }
  defaultSorted={ defaultSorted } 
/> : unloadedContent()}
        </Jumbotron>
        </>
    )
}