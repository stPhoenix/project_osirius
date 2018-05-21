import React from 'react';
import './AppComponent.css';
import {WordsTableComponent} from '../components';


export const MywordsAllComponent = (props) => {
    return (<div className="col-10 d-flex flex-column px-0 justify-content-center align-items-center" >
                <div className="d-flex align-self-end px-0" >
					<button className="btn btn-link " onClick={props.delete_selected}>Delete selected</button>
					<button className="btn btn-link pr-0" onClick={props.delete_all}>Delete all</button>
				</div>
                <WordsTableComponent words={props.words} handleCheck={props.handleCheck} />
          </div>);  
};