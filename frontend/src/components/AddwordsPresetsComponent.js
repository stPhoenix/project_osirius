import React from 'react';
import './AppComponent.css';
import {WordsTableComponent} from '../components';


export const AddwordsPresetsComponent = (props) => {
    return (<div className="col-10 d-flex flex-column px-0 justify-content-center align-items-center" >
                <form className="w-100">
                    <label htmlFor="categories" >Choose category:</label>
                    <select className="custom-form-control" id="categories" onChange={props.handleChange} name="category">
                                        {props.cats.map((category) => (<option key={category.name}>{category.name}</option>))}
                    </select>
                </form>
                <button className="btn btn-link align-self-end mt-3 px-0" onClick={props.add_all}>Add all</button>
                <WordsTableComponent words={props.words} />
          </div>);  
};