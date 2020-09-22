import React from 'react';
import FormGroup from '../FormGroup';
import {FirebaseContext} from '../Firebase';

import '../SignIn/SignIn.css';
import Button from "../Button";
import { Link } from "react-router-dom";

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE };
    }
   
    handleSubmit = (e) => {
        const {username, email, passwordOne} = this.state;

        this.props.firebase.registerUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
            this.setState({...INITIAL_STATE});
        })
        .catch(error => {
            this.setState({error})
        });

        e.preventDefault();
    }

    handleOnChange = (event) => {
         let target = event.target;

         this.setState({
            [target.name]:[target.value]
         });
    }

    render() {
        
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
          } = this.state;
        
        
        const isInvalid =
          passwordOne !== passwordTwo ||
          passwordOne === '' ||
          email === '' ||
          username === '';
        
        console.log(this.state);

        return (
            <div className="form-wrapper">
                <form onSubmit={this.handleSubmit} className="form">
                <h3 className="title">Sign Up</h3>
                    <FormGroup
                        id="user-name"
                        name="username"
                        type="text"
                        value={username}
                        onChange={this.handleOnChange}
                    >
                        Username
                    </FormGroup>

                    <FormGroup
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={this.handleOnChange}
                    >
                        Email
                    </FormGroup>

                    <FormGroup
                        id="password"
                        name="passwordOne"
                        type="password"
                        value={passwordOne}
                        onChange={this.handleOnChange}
                    >
                        Password
                    </FormGroup>

                    <FormGroup
                        id="password"
                        name="passwordTwo"
                        type="password"
                        value={passwordTwo}
                        onChange={this.handleOnChange}
                    >
                        Confirm Password
                    </FormGroup>

                    <div className="form-group d-flex content-center">
                        <Button
                            className="btn btn-lg btn-primary"
                            text="Sign Up"
                            onClick={e => console.log(e)}
                            type="submit"
                            disabled={isInvalid}
                        ></Button>
                    </div>
                    {error && <p>{error.message}</p>}

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
}

const SignUpPage = withFirebase(SignUpForm);

export default SignUpPage;
export {SignUpForm};