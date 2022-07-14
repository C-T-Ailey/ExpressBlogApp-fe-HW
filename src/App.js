import React, { useState, useEffect } from 'react'
import AuthorList from './author/AuthorList'
import Signup from './user/Signup'
import Login from './user/Login'
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

import {Alert} from 'react-bootstrap'


export default function App() {

  const [isAuth, setIsAuth] = useState(false)

  const [user, setUser] = useState({})

  // const [message, setMessage] = useState(null)

  const [successMessage, setSuccessMessage] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)

  const [currentUserRole, setCurrentUserRole] = useState(null)


//   if(user.role == "Admin"){
//     //
//   } else if(user.role=="regular")

// }

  useEffect(() => {
    let token = localStorage.getItem("token");

    if(token != null){
      let user = jwt_decode(token);
      console.log("USER: ", user)

      if(user){
        setIsAuth(true)
        setUser(true)
      }
      else if (!user){
        localStorage.removeItem("token");
        setIsAuth(false)
      }
    }
  }, [])

  const registerHandler = (user) => {
    axios.post("auth/signup", user)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const loginHandler = (cred) => {
    axios.post("auth/login", cred)
    .then(response => {
      console.log(response.data.token)
      if(response.data.token != null){
        localStorage.setItem("token", response.data.token);
        let user = jwt_decode(response.data.token)
        setIsAuth(true)
        setUser(user)
        setSuccessMessage(`User logged in successfully.`)
      }
    })
    .catch(error => {
      console.log(error);
      setIsAuth(false);
      setErrorMessage("Failed to log in.")
    })
  }

  const onLogoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setIsAuth(false)
    setUser(null)
    setSuccessMessage("You have successfully logged out.")
  }

  const errMessage = errorMessage ? (
    <Alert variant="danger">{errorMessage}</Alert>
  ) : null;

  const sccssMessage = successMessage ? (
    <Alert variant="success">{successMessage}</Alert>
  ) : null;


  return (
    <Router>
      <div>
        {errMessage}
        {sccssMessage}
        <nav>
          { isAuth ? (
          <div>
            {console.log(user)}
            {user ? "Welcome, " + user.user.name : null} &nbsp;
            <Link to="/">Home</Link> &nbsp;
            <Link to="/logout" onClick={onLogoutHandler}>Logout</Link> &nbsp;
          </div>
            ) : (
              <div>
                <Link to="/">Home</Link> &nbsp;
                <Link to="/signup">Sign Up</Link> &nbsp;
                <Link to="/login">Log In</Link> &nbsp;
              </div>
            )}
        </nav>
        <div>
          <Routes>
            <Route path="/" element={ isAuth ? <AuthorList /> : <Login login={loginHandler} />}></Route>
            <Route path="/signup" element={<Signup register={registerHandler} />}></Route>
            <Route path="/login" element={<Login login={loginHandler} />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  )
}
