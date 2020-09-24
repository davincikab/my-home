import React, { useState} from 'react';
import FormGroup from '../FormGroup';

import {compose} from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from "../../constants/routes";

import './SignIn.css';
import Button from "../Button";
import { Link, withRouter } from "react-router-dom";
import { PasswordResetLink } from '../PasswordReset';

const INIIAL_STATE = {
    email:"",
    password:"",
    error:null
};

class SignInForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {...INIIAL_STATE};
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;

        // sign the user
        this.props.firebase.signInWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({...INIIAL_STATE});
            this.props.history.push(ROUTES.HOME);
        })
        .catch(error => {
            this.setState({error});
        });
    }

    handleOnchage = (event) => {
         let target = event.target;

        this.setState({
            [target.name]:target.value
        });
    }

    render() {
        const {
            email,
            password,
            error
        } = this.state;

        const isInvalid = email === "" || password === "";

        return (
            <div className="form-wrapper">
                <form onSubmit={this.handleSubmit} className="form" method="POST">
                <h3 className="title">Sign In</h3>
                    <FormGroup
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={this.handleOnchage}
                    >
                        Email
                    </FormGroup>

                    <FormGroup
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={this.handleOnchage}
                    >
                        Password
                    </FormGroup>

                    <div className="form-group d-flex content-center">
                        <Button
                            className="btn btn-lg btn-primary"
                            text="Sign In"
                            onClick={e => console.log(e)}
                            type="submit"
                            disabled={isInvalid}
                        ></Button>
                    </div>

                    {error && <p>{error.message}</p>}

                    <div className="form-group">
                        <PasswordResetLink />

                        <small className="text">
                            Don't have an account ? 
                            <Link to="/sign-up" >  Register.</Link>
                        </small>

                    </div>
                </form>
            </div>
        );
    }
}

const SignInPage = compose(withRouter, withFirebase)(SignInForm);

export default SignInPage;
export { SignInForm }