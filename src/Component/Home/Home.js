import React from 'react';
import './Home.css';

import Button from '../Button/Button';
import Footer from  '../Footer/Footer';

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
                <h5 className="title-text">TESTIMONIAL</h5>
            </div>

            <div className="section">
                <h5 className="title-text">TESTIMONIAL</h5>
            </div>

            <div className="section">
                <h5 className="title-text">CONTATCT</h5>
            </div>

            <Footer />
        </div>
    );
}


export default Home;