import React from 'react';
import './AppComponent.css';
import {WordsTableComponent, ContentComponent} from '../components';
import PropTypes from 'prop-types';

const componentProps = {
    handleCheck: PropTypes.func,
    delete_selected: PropTypes.func,
    delete_all: PropTypes.func,
    words: PropTypes.array,
};

export const MywordsAllComponent = (props) => {
    return (<ContentComponent>
            <h2>All my words</h2>
                <div className="d-flex align-self-end px-0" >
					<button className="btn btn-link " onClick={props.delete_selected}>Delete selected</button>
					<button className="btn btn-link pr-0" onClick={props.delete_all}>Delete all</button>
				</div>
                <WordsTableComponent words={props.words} handleCheck={props.handleCheck} />
          </ContentComponent>);  
};

MywordsAllComponent.propTypes = componentProps;