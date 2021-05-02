import React from 'react';

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