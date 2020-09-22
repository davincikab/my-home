import React from 'react';
import './Home.css';

import Button from '../Button';
import Footer from  '../Footer/Footer';
import Card from '../Card/Card';

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
                <div className="section_inner">
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>

            <div className="section">
                <h5 className="title-text">CONTACT</h5>
            </div>

            <Footer />
        </div>
    );
}


export default Home;