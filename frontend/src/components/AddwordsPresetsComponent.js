import React from 'react';
import './AppComponent.css';
import {WordsTableComponent, ContentComponent} from '../components';
import {PaginationComponent} from "../components";
import PropTypes from 'prop-types';

const componentProps = {
    cats: PropTypes.array,
    handleChange: PropTypes.func,
    add_selected: PropTypes.func,
    add_all: PropTypes.func,
    words: PropTypes.array,
    handleCheck: PropTypes.func,
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    load_words_page: PropTypes.func,
};

export const AddwordsPresetsComponent = (props) => {
    return (<ContentComponent>
            <h2>Add words from presets</h2>
                <form>
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
                <PaginationComponent currentPage={props.currentPage} totalPages={props.totalPages} onPageChange={props.load_words_page} />
          </ContentComponent>);  
};

AddwordsPresetsComponent.propTypes = componentProps;