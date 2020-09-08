import React from 'react';
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
  return (
    <Router>
      <div className="nav">
        <nav className="navbar">
          <ul className="navbar-nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/map">Map</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
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
