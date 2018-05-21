import React from 'react';


export const ContentComponent = (props) => {
    return(
        <div className="d-flex flex-column align-self-center align-items-center justify-content-center">
            {props.children}
        </div>
    );
};