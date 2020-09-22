import React, { useState} from 'react';
import FormGroup from '../FormGroup';

import '../SignIn/SignIn.css';
import Button from "../Button";
import { Link } from "react-router-dom";

const SignUpForm = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleOnchage = (event) => {
         let target = event.target;
    }

    return (
        <div className="form-wrapper">
            <form onSubmit={handleSubmit} className="form">
            <h3 className="title">Sign Up</h3>
                <FormGroup
                    id="user-name"
                    name="username"
                    type="text"
                    value={username}
                    onChange={handleOnchage}
                >
                    Username
                </FormGroup>

                <FormGroup
                    id="email"
                    name="username"
                    type="email"
                    value={username}
                    onChange={handleOnchage}
                >
                    Email
                </FormGroup>

                <FormGroup
                    id="password"
                    name="password1"
                    type="password"
                    value={password}
                    onChange={handleOnchage}
                >
                    Password
                </FormGroup>

                <FormGroup
                    id="password"
                    name="password2"
                    type="password"
                    value={password}
                    onChange={handleOnchage}
                >
                    Confirm Password
                </FormGroup>

                <div className="form-group">
                    <Button
                        className="btn btn-primary"
                        text="Sign Up"
                        onClick={e => console.log(e)}
                        type="submit"
                    ></Button>
                </div>

                <div className="form-group">
                    <small className="text">
                        Already have an Account ? 
                        <Link to="/sign-in" >  Sign In.</Link>
                    </small>
                </div>
            </form>
        </div>
    );
}

export default SignUpForm;