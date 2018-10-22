import React from 'react';
import {ContentComponent} from '../components';
import "./AppComponent.css";
import {Alert} from 'reactstrap';
import PropTypes from 'prop-types';

const componentProps = {
    word: PropTypes.object,
    question: PropTypes.string,
    right_answer: PropTypes.string,
    answer: PropTypes.string,
    handleChange: PropTypes.func,
    button_click: PropTypes.func,
    button_text: PropTypes.string,
};

export const WordstrainerTypeComponent = (props) => {
    let data;
    if (Object.keys(props.word).length !== 0){
        data = (<div className="d-flex flex-column align-items-center">
			<h3>{props.question}</h3>
			<Alert color="danger" isOpen={(props.right_answer) ? true : false}>{props.right_answer}</Alert>
			<div className="form-group">
				<label htmlFor="answer">Type answer</label>
				<input className="custom-form-control my-1" type="text" name="answer" value={props.answer} onChange={props.handleChange} placeholder="Answer" />
			</div>
			<button className="custom-btn theme-primary px-3 py-1" onClick={props.button_click}>{props.button_text}</button>
		</div>);
    } else {
        data = (<h3>No words to play!</h3>)
    }
	return (
        <ContentComponent>
            <h2>Type</h2>
		{data}
        </ContentComponent>
	);
};

WordstrainerTypeComponent.propTypes = componentProps;