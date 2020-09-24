import React from 'react';
import './FormControl.css';

const FormControl  = ({id, name, value, type, onChange}) => {
    if(type === "range") {
        return (
            <input 
                className="form-control"
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
                className="form-control"
                name={name}
                id={id}
                value={value}
                type={type}
                onChange={onChange}
            />
    )
}

export default FormControl;