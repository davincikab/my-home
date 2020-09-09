import React, { useState, useRef, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './Component/Home/Home';
import Map from './Component/Map/Map';
import About from './Component/About/About';

function App() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navbarRef = useRef(null);
  const [height, setHeight] = useState(0);
  const device = window.innerWidth;

  useEffect(() =>{
    if(device < 12) {
      setIsCollapsed(true);
    }

    // update height
   setHeight(navbarRef.current.scrollHeight);
  }, []);

  const toggleNavLinks = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleActiveTab = (e) => {
    console.log(e);
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
              "height": isCollapsed ? "0px" : height +"px"
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
          </ul>
        </nav>

        {/* switch to map the path */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
