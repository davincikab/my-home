import React, { useState, useRef, useEffect } from 'react';
import { withFirebase } from './Component/Firebase';

import './App.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";

import Navigation from "./Component/Navigation";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      authUser:null
    };
  }

  componentDidMount() {
    // this.listener = this.props.firebase.auth.onAuthStateChanged(
    //   authUser => {
    //     authUser ? this.setState({authUser}) : this.setState({authUser:null});
      
    //   }
    // );

    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? this.setState({ authUser })
          : this.setState({ authUser: null });
      },
    );

  }

  componentWillMount() {
    // this.listener;
  }

  render() {
    return (
      <Router>
        <Navigation authUser={this.state.authUser}/>
      </Router>
    );
  }
  
}

export default withFirebase(App);
