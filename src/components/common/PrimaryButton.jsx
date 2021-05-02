import React from 'react';
import PropTypes from "prop-types";

const PrimaryButton = props => {
    return (
        <>
            <button className="btn btn-primary">
                {props.isLoading && <span className="spinner-border spinner-border-sm mr-1"/>}
                {props.text}</button>
        </>
    );
};

export {PrimaryButton};

PrimaryButton.propTypes = {
    isLoading: PropTypes.bool,
    text: PropTypes.string,
}