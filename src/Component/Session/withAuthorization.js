import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../Firebase";
import AuthContext  from "./context";

const withAuthorization = condition => Component => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    if(!condition(authUser)) {
                        this.props.history.push(ROUTES.SIGN_IN);
                    }
                }
            )
        }

        componentWillUnmount() {
            this.listener();
        }

        render() {
            return (
            <AuthContext.Consumber>
                {
                    authUser => condition(authUser) ? <Component {...this.props} /> : null
                }
            </AuthContext.Consumber>
            
            );
        }
    }

    return compose(
        withRouter,
        withFirebase
    )(WithAuthorization);

}

export default withAuthorization;