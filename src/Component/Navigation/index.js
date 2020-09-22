import React, { useState, useRef, useEffect } from 'react';
import "./Navigation.css";
 
import * as ROUTES from '../../constants/routes';
import { AuthContext } from './Component/Session';

import {
    Switch,
    Route,
    Link
  } from "react-router-dom";
  
  import Home from '../Home';
  import About from '../About';
  import MapContainer from '../Map';
  import SignInPage from '../SignIn';
  import SignUpPage from '../SignUp';
  import SignOutButton from '../SignOut';

const Navigation = () => {
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
        <AuthContext.Consumer >
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
                    { authUser ? 
                        <NavigationAuth toggleActiveTab={toggleActiveTab}/> : 
                        <NavigationNonAuth toggleActiveTab={toggleActiveTab} /> 
                    }

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
                    <SignInPage />
                </Route>

                <Route path="/sign-up">
                    <SignUpPage />
                </Route>
                </Switch>

            </div>
        </AuthContext.Consumer>
    )
}

// Aunthenicate
const NavigationAuth = ({ toggleActiveTab }) => (
    <>  
        <li onClick={toggleActiveTab}>
            <SignOutButton />
        </li>

        <li onClick={toggleActiveTab}>
            <Link to="/about" >Account</Link>
        </li>
    </>
);

const NavigationNonAuth = ({ toggleActiveTab }) => (
    <>
        <li onClick={toggleActiveTab}>
            <Link to="/sign-in" >Sign In</Link>
        </li>

        <li onClick={toggleActiveTab}>
            <Link to="/sign-up" >Sign Up</Link>
        </li>
    </>
);


export default Navigation;