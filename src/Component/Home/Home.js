import React from 'react';
import './Home.css';

import Button from '../Button/Button';

function Home (props) {
    const clickHandler = () => {
        console.log("Click");
    }

    return (
        <div className="main-page">
            <div className="landing">
                <Button text="My Home" onClick={clickHandler} className="btn custom-btn"/>
            </div>

            <div className="section">
                <h5 className="title-text">TESTIMONIALs</h5>
            </div>

            <div className="section">
                <h5 className="title-text">TESTIMONIALs</h5>
            </div>

            <div className="section">
                <h5 className="title-text">CONTATCTs</h5>
            </div>
        </div>
    );
}


export default Home;