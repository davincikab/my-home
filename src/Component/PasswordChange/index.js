import React from 'react';

import * as ROUTES from '../../constants/routes';
import FormGroup from '../FormGroup';
import Button from '../Button';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
    passwordOne:"",
    passwordTwo:"",
    error:""
};

class PasswordChangeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE}
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {passwordOne, passwordTwo} = this.state;

        this.props.firebase.passwordUpdate(passwordOne)
        .then(() => {
            this.setState({...INITIAL_STATE});
        })  
        .catch(error => {
            this.setState({error});
        });
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value });
    }

    render() {
        const {passwordOne, passwordTwo, error} = this.state;
        const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

        return (
        <div className="form-wrapper">
            <form className="form" method="POST" onSubmit={this.onSubmit}>
                <h3 className="title">Password Change</h3>
                <FormGroup
                    id="passwordOne"
                    name="passwordOne"
                    type="password"
                    value={passwordOne}
                    onChange={this.onChange}
                >
                    Password
                </FormGroup>

                <FormGroup
                    id="passwordTwo"
                    name="passwordTwo"
                    type="password"
                    value={passwordTwo}
                    onChange={this.onChange}
                >
                   Confirm Password
                </FormGroup>

                <div className="form-group d-flex content-center">
                        <Button
                            className="btn btn-lg btn-primary"
                            text="Reset Password"
                            onClick={e => console.log(e)}
                            type="submit"
                            disabled={isInvalid}
                        ></Button>
                    </div>

                    {error && <p>{error.message}</p>}
            </form>
        </div>
        );
    }
}

const PasswordChangeLink = (props) => (
    <Link to={ROUTES.PASSWORD_CHANGE}>Change Password?</Link>
);

const PasswordChangePage = withFirebase(PasswordChangeForm);

export default PasswordChangePage;
export {PasswordChangeForm, PasswordChangeLink};


// restructure