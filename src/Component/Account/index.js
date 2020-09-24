import React from 'react';
import "./Account.css";

import { PasswordChangeForm } from '../PasswordChange';
import { PasswordResetForm } from '../PasswordReset';


const Account = (props) => {
    return (
        <div className="row">
            <PasswordResetForm />
            <PasswordChangeForm />
        </div>
    );
}

export default Account;