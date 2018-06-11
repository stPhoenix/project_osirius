import React from 'react';
import './AppComponent.css';
import {WordsTableComponent, ContentComponent} from '../components';


export const MywordsLearnedComponent = (props) => {
    return (<ContentComponent>
                <div className="d-flex align-self-end px-0" >
					<button className="btn btn-link " onClick={props.learn_selected}>Learn again selected</button>
					<button className="btn btn-link pr-0" onClick={props.learn_all}>Learn all</button>
				</div>
                <WordsTableComponent words={props.words} handleCheck={props.handleCheck} />
        </ContentComponent>);  
};