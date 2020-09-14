import React from 'react';

const FormControl  = ({id, name, value, type, onChange}) => {
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