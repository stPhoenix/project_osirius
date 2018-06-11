import React from 'react';
import './AppComponent.css';
import {WordsTableComponent, ContentComponent} from '../components';


export const AddwordsPresetsComponent = (props) => {
    return (<ContentComponent>
                <form className="col-12 col-lg-8 px-0">
                    <label htmlFor="categories" >Choose category:</label>
                    <select className="custom-form-control" id="categories" onChange={props.handleChange} name="category">
                                        {props.cats.map((category) => (<option key={category.name}>{category.name}</option>))}
                    </select>
                </form>
                <div className="d-flex align-self-end mt-3 px-0" >
					<button className="btn btn-link " onClick={props.add_selected}>Add selected</button>
					<button className="btn btn-link pr-0" onClick={props.add_all}>Add all</button>
				</div>
                <WordsTableComponent words={props.words} handleCheck={props.handleCheck} />
          </ContentComponent>);  
};