import React from 'react';
import {ContentComponent} from '../components';
import "./AppComponent.css";
import {Alert} from 'reactstrap';


export const WordstrainerTypeComponent = (props) => {
	return (
		<ContentComponent>
			<h3>{props.question}</h3>
			<Alert color="danger" isOpen={(props.right_answer) ? true : false}>{props.right_answer}</Alert>
			<div className="col-12 col-lg-8 form-group">
				<label htmlFor="answer">Type answer</label>
				<input className="custom-form-control" type="text" name="answer" value={props.answer} onChange={props.handleChange} placeholder="Answer" />
			</div>
			<button className="custom-btn theme-primary px-3 py-1" onClick={props.button_click}>{props.button_text}</button>
		</ContentComponent>
	);
};