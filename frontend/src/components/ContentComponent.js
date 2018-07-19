import React from 'react';
import PropTypes from 'prop-types';

const componentProps = {
    children: PropTypes.oneOfType([
                                    PropTypes.array,
                                    PropTypes.object,
                                    PropTypes.string,
  ]),
};

export const ContentComponent = (props) => {
    return(
        <div className="col-10 d-flex flex-column align-self-center align-items-center justify-content-center p-0">
            {props.children}
        </div>
    );
};

ContentComponent.propTypes = componentProps;