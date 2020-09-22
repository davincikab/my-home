import React from 'react';
import Card from '../Card/Card';

export function Carousel(props) {
    return (
        <div className="carousel">
            <div className="forward-btn">
            </div>

             <div className="back-btn">
            </div>

            <div className="carousel-container">
                    <div className="carousel-item"></div>
            </div>
        </div>
    );
}