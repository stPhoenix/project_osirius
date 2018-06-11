import React from 'react';


export const ContentComponent = (props) => {
    return(
        <div className="col-10 d-flex flex-column align-self-center align-items-center justify-content-center p-0">
            {props.children}
        </div>
    );
};