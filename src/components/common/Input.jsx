import React from 'react';
import {capitalizeAndAddSpace} from "../util/string";

const Input = props => {
    return (
        <>
            <div className="form-group">
                <label>{capitalizeAndAddSpace(props.name)}</label>
                <input type="text" name={props.name} value={props.value} onChange={props.handleChange}
                       className={'form-control' + (props.submitted && !props.value ? ' is-invalid' : '')} />
                {props.submitted && !props.value &&
                <div className="invalid-feedback">Field is required</div>
                }
            </div>
        </>
    );
};

export {Input};