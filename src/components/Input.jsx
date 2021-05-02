import React from 'react';

const Input = props => {
    return (
        <>
            <div className="form-group">
                <label>{capitalize(props.name)}</label>
                <input type="text" name={props.name} value={props.value} onChange={props.handleChange}
                       className={'form-control' + (props.submitted && !props.value ? ' is-invalid' : '')} />
                {props.submitted && !props.value &&
                <div className="invalid-feedback">Field is required</div>
                }
            </div>
        </>
    );
};

const capitalize = (text) => {
    if (typeof text !== 'string') return ''
    return text.charAt(0).toUpperCase() + text.slice(1)
}

export {Input};