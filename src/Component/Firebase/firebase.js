import app from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyCEBeQ6WgDFqOElGO4JTwF5Vt9_8i358fY",
    authDomain: "myhome-7192f.firebaseapp.com",
    databaseURL: "https://myhome-7192f.firebaseio.com",
    projectId: "myhome-7192f",
    storageBucket: "myhome-7192f.appspot.com",
    messagingSenderId: "501807741812",
    appId: "1:501807741812:web:eefd8c8464abcf90cf0a21",
    measurementId: "G-YL97RYLS9X"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();
        this.db = app.database();
    }

    // user authentication
    registerUserWithEmailAndPassword = (email, password) => {
        return this.auth.createUserWithEmailAndPassword(email, password);
    }

    signInWithEmailAndPassword = (email, password) => {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    signOutUsers = () => {
        return this.auth.signOut();
    }

    resetPassword = (email) => {
        return this.auth.resetPassword(email);
    }

    passwordUpdate = (password) => {
        return this.auth.passwordUpdate(password);
    }
    
    // methods to access the data
    home = hid => this.db.ref(`homes/features/${hid}`);
    homes = () => this.db.ref("homes");
}

export default Firebase;

