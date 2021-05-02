import React from 'react';
import {capitalizeAndAddSpace} from "../util/string";
import PropTypes from 'prop-types';

const Input = props => {

    const optionalValidationError = () => props.submitted && validationFailed(props.value) ? ' is-invalid' : ''
    const validationFailed = (field) => !field || field.length < 4

    return (
        <>
            <div className="form-group">
                <label>{capitalizeAndAddSpace(props.name)}</label>
                <input type={props.type} name={props.name} value={props.value} onChange={props.handleChange}
                       className={'form-control' + optionalValidationError()} />
                {optionalValidationError() &&
                <div className="invalid-feedback">Required field length is 4 or more</div>
                }
            </div>
        </>
    );
};

Input.defaultProps = {
    type: 'text'
}

Input.propTypes = {
    name: PropTypes.string,
    submitted: PropTypes.bool,
    value: PropTypes.string,
    handleChange: PropTypes.func,
    type: PropTypes.string
}

export {Input};