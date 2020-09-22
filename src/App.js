import React, { useState, useRef, useEffect } from 'react';
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
  render() {
    return (
      <Router>
        <Navigation authUser={this.state.authUser}/>
      </Router>
    );
  }
  
}

export default App;
