import React from 'react';
import './AppComponent.css';
import {WordsTableComponent, ContentComponent} from '../components';
import PropTypes from 'prop-types';

const componentProps = {
    handleCheck: PropTypes.func,
    learn_selected: PropTypes.func,
    learn_all: PropTypes.func,
};

export const MywordsLearnedComponent = (props) => {
    return (<ContentComponent>
            <h2>My learned words</h2>
                <div className="d-flex align-self-end px-0" >
					<button className="btn btn-link " onClick={props.learn_selected}>Learn again selected</button>
					<button className="btn btn-link pr-0" onClick={props.learn_all}>Learn all</button>
				</div>
                <WordsTableComponent words={props.words} handleCheck={props.handleCheck} />
        </ContentComponent>);  
};

MywordsLearnedComponent.propTypes = componentProps;