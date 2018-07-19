import React from 'react';
import {ContentComponent} from '../components';
import "./AppComponent.css";
import PropTypes from 'prop-types';

const componentProps = {
    words: PropTypes.array,
    question: PropTypes.string,
    proceed_answer: PropTypes.func,
    next_word: PropTypes.func,
};

export const WordstrainerMatchComponent = (props) => {
	let data;
    if (props.words.length !== 0){
		data = (<ContentComponent><h3>{props.question}</h3>
			<div className="col-12 col-lg-8 form-group">
				<label htmlFor="answer_set">Choose answer</label>
				<div className="list-group" id="answer_set">
                    {props.words.map((word) => {
                                                const classes = "custom-form-control active " + word.color;
                                                return (<button key={word.id} name={word.id} type="button" className={classes} onClick={props.proceed_answer} >{word.active}</button>);
                    })}
			     </div>
            </div>
                <button className="custom-btn theme-primary px-3 py-1" onClick={props.next_word}>Next</button></ContentComponent>
	);
    } else {
        data = "No words to play!"
    }
    return (
        <ContentComponent>
            {data}
        </ContentComponent>
    );
};

WordstrainerMatchComponent.propTypes = componentProps;