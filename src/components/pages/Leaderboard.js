import {useState, useEffect} from "react"
import {Jumbotron} from "react-bootstrap"
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import firebase from "../../firebase.js"


export default function Leaderboard(props) {

    const [rankings, setRankings] = useState([])

    const columns = [{
        dataField: 'first_name',
        text: 'First Name',
      }, {
        dataField: 'last_name',
        text: 'Last Name',
      }, {
        dataField: 'hours',
        text: 'Hours',
      }
    
    
    ];
      
    const defaultSorted = [{
        dataField: 'hours',
        order: 'desc'
      }];

      
    useEffect(() => {
        if(props.checkedUser) {
        console.log("run")
        firebase.database().ref('users/').get()
        .then((response) => {
            let tempArr = []
            let attr = response.val()
            Object.keys(attr).forEach((attrName) => {
                let userObj = attr[attrName];
                let firstName = userObj["first_name"]
                let lastName = userObj["last_name"]
                let resultTotal = 0
                if(userObj["results"] != null) {
                    userObj["results"].map((workout) => {
                        resultTotal += parseFloat(workout.hours)
                    })
                }
                if(resultTotal > 0) {
                    tempArr.push({"first_name": firstName, "last_name":lastName, "hours": resultTotal})
                }
            })
            console.log(tempArr)
            setRankings(tempArr)
            // if(attr != null && attr.results != null) {
            //     setWorkouts(attr.results)
            // }
            // else {
            //     setWorkouts([])
            // }
            // props.load(false)
        })
    }
    },[props.userId])

    return(
        <Jumbotron style={{height:"100vh"}}>
            <h1>Your Leaderboard</h1>
            <BootstrapTable
            bootstrap4
  keyField="last_name"
  data={ rankings }
  columns={ columns }
  defaultSorted={ defaultSorted } 
/> 
        </Jumbotron>
    )
}