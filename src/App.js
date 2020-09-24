import React, {  } from 'react';
import { withAuthentication } from './Component/Session';

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './Component/Home';
import About from './Component/About';
import MapContainer from './Component/Map';
import SignInPage from './Component/SignIn';
import SignUpPage from './Component/SignUp';
import Navigation from "./Component/Navigation";

const App = () => {
  return (
      <Router>
        <div className="nav">
          <Navigation />
          <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/map">
                    <MapContainer />
                </Route>
                <Route path="/sign-in">
                    <SignInPage />
                </Route>

                <Route path="/sign-up">
                    <SignUpPage />
                </Route>
          </Switch>
        </div>
      </Router>
  );
}


export default withAuthentication(App);
