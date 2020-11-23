import React, { useState, useRef, useEffect } from 'react';
import "./Navigation.css";
 
import * as ROUTES from '../../constants/routes';
import { AuthContext } from '../Session';

import {
    Link
} from "react-router-dom";

import SignOutButton from '../SignOut';

const Navigation = (props) => {
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

    // console.log(props.authUser);
    return (
        <AuthContext.Consumer>
            { authUser => (
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
                    <Link to={ROUTES.HOME} >Home</Link>
                    </li>

                    <li onClick={toggleActiveTab}>
                    <Link to={ROUTES.MAP}>Map</Link>
                    </li>

                    {/* <li onClick={toggleActiveTab}>
                        <Link to={ROUTES.ABOUT} >Donate</Link>
                    </li> */}
                    { authUser ? 
                        <NavigationAuth toggleActiveTab={toggleActiveTab} /> : 
                        <NavigationNonAuth toggleActiveTab={toggleActiveTab} /> 
                    }

                </ul>
                </nav>
            )}
        </AuthContext.Consumer>
    )
}


// Aunthenicate
const NavigationAuth = ({ toggleActiveTab }) => (
    <>  
        <li onClick={toggleActiveTab}>
            <Link to={ROUTES.ACCOUNT} >Account</Link>
        </li>
        <li onClick={toggleActiveTab}>
            <SignOutButton />
        </li>
    </>
);

const NavigationNonAuth = ({ toggleActiveTab }) => (
    <>
        <li onClick={toggleActiveTab}>
            <Link to={ROUTES.SIGN_IN} >Sign In</Link>
        </li>

        <li onClick={toggleActiveTab}>
            <Link to={ROUTES.SIGN_UP} >Sign Up</Link>
        </li>
    </>
);


export default Navigation;


// user:rcsoft.luis@gmail.com
// pssw:p3@X4MEXAK_kJb