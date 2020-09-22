import React, { useState, useRef, useEffect } from 'react';
import { withFirebase } from './Component/Firebase';
import { AuthContext, withAuthentication } from './Component/Session';

import './App.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";

import Navigation from "./Component/Navigation";

const App = (props) => {
    return (
        <Router >
          <Navigation />
        </Router>
    );
  }


export default withAuthentication(App);
