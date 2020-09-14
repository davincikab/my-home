import React from 'react';
import FormControl from '../FormControl';

const RadioButton = ({id, name, value, type, onChange, children}) => {
    return (
        <label htmlFor={id} className="filter">
            <FormControl 
                id={id}
                name={name}
                value={value}
                type={type}
                onChange={onChange}
            />
           {children}
        </label>
    )
}

export default RadioButton;