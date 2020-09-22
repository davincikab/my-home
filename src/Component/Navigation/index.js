import React from 'react';
import { Link } from 'react-router-dom';
import "./Navigation.css";
 
import * as ROUTES from '../../constants/routes';
import SignUpPage from '../SignUp';

export const Navigation = (props) => {
    return (
        <div className="nav">
        <nav className="navbar">
            <Link to="/" className="navbar-brand">myHome.</Link>
            <div 
              className="navbar-toggler" 
              onClick={toggleNavLinks}
              >
                <span></span>
                <span></span>
                <span></span>
            </div>
          <ul 
            ref={navbarRef}
            className="navbar-nav"
            style={{
              height: isCollapsed ? "0px" : height +"px"
            }}
          >
            <li  onClick={toggleActiveTab}>
              <Link to="/">Home</Link>
            </li>

            <li onClick={toggleActiveTab}>
              <Link to="/map">Map</Link>
            </li>

            <li onClick={toggleActiveTab}>
              <Link to="/about" >About</Link>
            </li>

            <li onClick={toggleActiveTab}>
              <Link to="/about" >Donate</Link>
            </li>

            <li onClick={toggleActiveTab}>
              <Link to="/sign-in" >Sign In</Link>
            </li>

            <li onClick={toggleActiveTab}>
              <Link to="/sign-up" >Sign Up</Link>
            </li>

            <li onClick={toggleActiveTab}>
              <Link to="/about" >Sign Out</Link>
            </li>

          </ul>
        </nav>

        {/* switch to map the path */}
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
            <SignInForm />
          </Route>

          <Route path="/sign-up">
            <SignUpPage />
          </Route>
        </Switch>

      </div>
    )
}