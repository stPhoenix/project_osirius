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
            <section className="row d-flex justify-content-center">
                <div className="col-12 col-md-11 col-xl-7 d-flex flex-column my-4 align-items-center">            
                    {props.children}
                </div>
            </section>
    );
};

ContentComponent.propTypes = componentProps;