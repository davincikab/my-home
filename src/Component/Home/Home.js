import React from 'react';
import './Home.css';

import Button from '../Button/Button';

function Home (props) {
    const clickHandler = () => {
        console.log("Click");
    }

    return (
        <div className="main-page">
            <Button text="My Home" onClick={clickHandler} className="btn custom-btn"/>
        </div>
    );
}


export default Home;