import React, { useState } from 'react'
import {Container, Form, Button} from 'react-bootstrap'


export default function Signup(props) {

    const [newUser, setNewUser] = useState({})

  // handlechange takes event (the assigned field)
  const handleChange = (event) => {
    const user = {...newUser}
    user[event.target.name] = event.target.value
    console.log(user)
    setNewUser(user)
  }

  const registerHandler = () => {
    props.register(newUser)
  }

  return (
    <div>
        <h1>Sign Up</h1>
        <Container>
            <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control name="firstName" onChange={handleChange}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control name="lastName" onChange={handleChange}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control name="emailAddress" onChange={handleChange}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>password</Form.Label>
                <Form.Control name="password" type="password" onChange={handleChange}></Form.Control>
            </Form.Group>

            <Button variant="primary" onClick={registerHandler}>Register</Button>
        </Container>
    </div>
  )
}
