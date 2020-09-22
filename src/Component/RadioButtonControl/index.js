import React from 'react';
import FormControl from '../FormControl';
import './RadioButton.css'

const RadioButton = ({id, name, value, type, onChange, activeVisual, children}) => {
    return (
        <label htmlFor={id} className={value == activeVisual ? "filter active-filter" : "filter"}>
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