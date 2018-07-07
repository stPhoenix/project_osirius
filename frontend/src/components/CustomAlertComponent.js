import {Alert} from 'reactstrap';
import React from 'react';
import './CustomAlertComponent.css';

export const CustomAlertComponent = (props) => {
    return (
         <Alert className="w-100 d-flex justify-content-center py-2 rounded-0"
                color={props.color} isOpen={props.visible} toggle={props.toggle}
                transition={{baseClass:"alert-anim", timeout:300, onExited:props.onExited}} >{props.text}</Alert>
    );
};