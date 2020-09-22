import React, { useState} from 'react';
import FormGroup from '../FormGroup';

import './SignIn.css';
import Button from "../Button";
import { Link } from "react-router-dom";

const SignInForm = (props) => {
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
            <h3 className="title">Sign In</h3>
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
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={handleOnchage}
                >
                    Username
                </FormGroup>

                <div className="form-group d-flex content-center">
                    <Button
                        className="btn btn-lg btn-primary"
                        text="Sign In"
                        onClick={e => console.log(e)}
                        type="submit"
                    ></Button>
                </div>

                <div className="form-group">
                    <small className="text">
                        Don't have an account ? 
                        <Link to="/sign-up" >  Register.</Link>
                    </small>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;