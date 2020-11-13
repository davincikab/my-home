import React from 'react';
import "./Account.css";

import { PasswordChangeForm } from '../PasswordChange';
import { PasswordResetForm } from '../PasswordReset';
import { withAuthorization, AuthContext } from '../Session';



const Account = (props) => {
    return (
        <AuthContext.Consumer>
            {
                authUser => (
                    <>
                    <div className="row">
                        <PasswordResetForm />
                        <PasswordChangeForm />
                    </div>
                    </>
                )
            }
        </AuthContext.Consumer>
    );
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Account);