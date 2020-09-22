import React from 'react';
import FormControl from '../FormControl';

import "./FormGroup.css";

const FormGroup = ({id, name, type, value, onChange, children}) => {
    return (
        <div className="form-group">
            <label htmlFor={id}>
                {children}
            </label>
            <FormControl 
                id={id}
                name={name}
                value={value}
                type={type}
                onChange={onChange}
            />
        </div>
    )
}
export default FormGroup;