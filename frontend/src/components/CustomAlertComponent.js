import {Alert} from 'reactstrap';
import React from 'react';
import './CustomAlertComponent.css';
import PropTypes from 'prop-types';

const componentProps = {
    color: PropTypes.string,
    visible: PropTypes.bool,
    toggle: PropTypes.func,
    onExited: PropTypes.func,
    text: PropTypes.string,
};

export const CustomAlertComponent = (props) => {
    return (
         <Alert className="w-100 d-flex justify-content-center py-2 rounded-0"
                color={props.color} isOpen={props.visible} toggle={props.toggle}
                transition={{baseClass:"alert-anim", timeout:300, onExited:props.onExited}} >{props.text}</Alert>
    );
};

CustomAlertComponent.propTypes = componentProps;