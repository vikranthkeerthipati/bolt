import {useState, useEffect} from "react"
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { css } from "@emotion/react";
import SignIn from "./components/pages/SignIn"
import SignUp from "./components/pages/SignUp"
import Leaderboard from "./components/pages/Leaderboard"
import Landing from "./components/pages/Landing"
import LogWorkout from "./components/pages/LogWorkout"
import Profile from "./components/pages/Profile"
import MyWorkouts from "./components/pages/MyWorkouts";
import MyFriends from "./components/pages/MyFriends";
import './App.css';
import firebase from "./firebase.js"
import MainNavbar from "./components/Navbar"
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";


function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkedUser, setCheckedUser] = useState(false)
  const [userId, setUserId] = useState("")
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
// Can be a string as well. Need to ensure each key-value pair ends with ;
    const override = css`
    display: block;
    position: fixed;
    margin: 0 auto;
    border-color: #000000;
    top: 50%;
    left: calc(50vw - 75px);
    `;
  

  useEffect(async () => {
    await firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("logged in")
        setLoggedIn(true)
        setCheckedUser(true)
        setEmail(user.email.replace(".","~"))
        setUserId(user.uid)
      } else {
        console.log("not logged in")
        setCheckedUser(true)
      }
    });
  })

  function loadingSwitch(status) {
      console.log(status)
      setLoading(status)
  }
  
  return (
    <>
            {loading ? <div style={{backgroundColor: "rgba(255,255,255,0.5)",width:"100vw",height:"100vh",zIndex:99,position:"fixed"}}>
        <ClimbingBoxLoader color="#000000" loading={loading} css={override} size={15} />
        </div> : null}
    {checkedUser ?
    <Router>
    <MainNavbar loggedIn={loggedIn}/>
    <Switch>
      <Route path='/' exact render={(props) => (<Landing {...props} loggedIn={loggedIn}/>)} />
      <Route path='/signin' render={(props) => (<SignIn {...props} loggedIn={loggedIn}/>)} />
      <Route path="/signup" render={(props) => (<SignUp {...props} loggedIn={loggedIn}/>)} />
      <Route path="/signup" render={(props) => (<SignUp {...props} loggedIn={loggedIn}/>)} />
      <Route path="/leaderboard" render={(props) => (<Leaderboard {...props} loggedIn={loggedIn} checkedUser={checkedUser}/>)} />
      <Route path="/myfriends" render={(props) => (<MyFriends {...props} loggedIn={loggedIn} userId={email}/>)} />
      <Route path="/myworkouts" render={(props) => (<MyWorkouts {...props} loggedIn={loggedIn} userId={email} checkedUser={checkedUser} load={loadingSwitch}/>)} />
      <Route path="/logworkout" render={(props) => (<LogWorkout {...props} loggedIn={loggedIn} userId={email} checkedUser={checkedUser}/>)} />
      <Route path='/profile' render={(props) => (<Profile {...props} loggedIn={loggedIn} load={loadingSwitch}/>)} />


      {!loggedIn ? <Redirect to="/" /> : null}
    </Switch>
  </Router> : null}

  </>
  );
}

export default App;
