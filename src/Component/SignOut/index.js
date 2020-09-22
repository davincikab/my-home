import React from 'react';
import { withFirebase } from '../Firebase';

const SignOutButton = ({firebase}) => (
    <button className="btn" onClick={firebase.signOut}>
        Sign Out
    </button>
);

export default withFirebase(SignOutButton);

