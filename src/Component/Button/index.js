import React from 'react';
import './Button.css';
function Button(props) {
    return (
        <button 
            className={props.className}
            onClick={props.onClick}
            type={props.type}
            disabled={props.disabled}
        >
            {props.text}
        </button>
    );
}

export default Button;