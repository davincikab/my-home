import React from "react";
import "./Card.css";

function Card(props) {
    return (
        <div className="card">
            <div className="card-body">
                <div className="card-title">
                "
                </div>
                As you can see, we’ve pulled off a really nice letterpress effect. 
                That blurry edge is being cropped and now creates the illusion of an inset shadow. 
            </div>
            <div className="card-footer">
                <img src={require("../../assets/images/children.jpg")} className="img img-circle" />
                <p className="text">Harris Porter</p>
            </div>
        </div>
    );
}

export default Card;