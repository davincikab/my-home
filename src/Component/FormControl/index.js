import React from 'react';
import './FormControl.css';

const FormControl  = ({id, name, value, type, placeholder="", className="form-control", onChange}) => {

    if(type === "range") {
        return (
            <input 
                className={className}
                name={name}
                id={id}
                value={value}
                type={type}
                onChange={onChange}
                max="500"
            />
        )
    }

    return (
            <input 
                className={className}
                name={name}
                id={id}
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
            />
    )
}

export default FormControl;