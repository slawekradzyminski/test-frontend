import React from 'react';
import {capitalizeAndAddSpace} from "../util/string";
import PropTypes from 'prop-types';

const DisabledInput = props => {
    return (
        <>
            <div className="form-group">
                <label>{capitalizeAndAddSpace(props.name)}</label>
                <input disabled={true} type="text" name={props.name} value={props.value} className={'form-control'}/>
            </div>
        </>
    );
};

export {DisabledInput};

DisabledInput.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
}