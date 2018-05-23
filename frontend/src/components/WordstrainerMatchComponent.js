import React from 'react';
import {ContentComponent} from '../components';
import "./AppComponent.css";


export const WordstrainerMatchComponent = (props) => {
	return (
		<ContentComponent>
			<h3>{props.question}</h3>
			<div className="w-100 form-group">
				<label htmlFor="answer_set">Choose answer</label>
				<div className="list-group" id="answer_set">
                    {props.words.map((word) => {
                                                const classes = "custom-form-control active " + word.color;
                                                return (<button key={word.id} name={word.id} type="button" className={classes} onClick={props.proceed_answer} >{word.active}</button>);
                    })}
			     </div>
            </div>
			<button className="custom-btn theme-primary px-3 py-1" onClick={props.next_word}>Next</button>
		</ContentComponent>
	);
};