import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './Component/Home/Home';
import About from './Component/About/About';
import MapContainer from './Component/Map/Map';
import SignInForm from './Component/SignIn';
import SignUpForm from './Component/SignUp';

function App() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navbarRef = useRef(null);
  const [height, setHeight] = useState(0);
  const deviceWidth = window.innerWidth;

  useEffect(() =>{
    if(deviceWidth < 12) {
      setIsCollapsed(true);
    }

    // update height
   setHeight(navbarRef.current.scrollHeight);
  }, [deviceWidth]);

  const toggleNavLinks = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleActiveTab = (e) => {
    console.log(e);
    setIsCollapsed(true);
  }

  return (
    <Router>
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
            <SignUpForm />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
