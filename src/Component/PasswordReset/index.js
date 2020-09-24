import React from 'react';

import * as ROUTES from '../../constants/routes';
import FormGroup from '../FormGroup';
import Button from '../Button';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
    email:"",
    error:""
};

class PasswordResetForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE}
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {email} = this.state;

        this.props.firebase.resetPassword(email)
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
        const {email, error} = this.state;
        const isInvalid = email === "";

        return (
        <div className="form-wrapper">
            <form className="form" method="POST" onSubmit={this.onSubmit}>
                <h3 className="title">Password Reset</h3>
                <FormGroup
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={this.onChange}
                >
                    Email
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

const PasswordResetLink = (props) => (
    <Link to={ROUTES.PASSWORD_FORGET}>Reset Password ?</Link>
);

const PassWordResetPage = withFirebase(PasswordResetForm);

export default PassWordResetPage;
export {PasswordResetForm, PasswordResetLink};


// restructure