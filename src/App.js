import React, {  } from 'react';
import { withAuthentication } from './Component/Session';

import './App.css';

import * as ROUTES from "./constants/routes";
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
import PasswordChangePage from "./Component/PasswordChange";
import PassWordResetPage from "./Component/PasswordReset";
import Account from "./Component/Account";

const App = () => {
  return (
      <Router>
        <div className="nav">
          <Navigation />
          <Switch>
                <Route path={ROUTES.HOME} exact>
                    <Home />
                </Route>

                <Route path={ROUTES.ABOUT}>
                    <About />
                </Route>

                <Route path={ROUTES.MAP}>
                    <MapContainer />
                </Route>

                <Route path={ROUTES.SIGN_IN}>
                    <SignInPage />
                </Route>

                <Route path={ROUTES.SIGN_UP}>
                    <SignUpPage />
                </Route>

                <Route path={ROUTES.ACCOUNT}>
                    <Account />
                </Route>

                <Route path={ROUTES.PASSWORD_FORGET} >
                  <PassWordResetPage />
                </Route>

                <Route path={ROUTES.PASSWORD_CHANGE} >
                  <PasswordChangePage />
                </Route>

                <Route path='*' exact={true} component={Home} />
          </Switch>
        </div>
      </Router>
  );
}


export default withAuthentication(App);