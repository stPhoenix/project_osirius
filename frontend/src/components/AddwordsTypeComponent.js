import React from 'react';
import './AppComponent.css';
import {CardDeck, Card, CardBody, CardText} from 'reactstrap';
import {AddwordsTypeModalComponent} from '../components';


export const AddwordsTypeComponent = (props) => {
	
	let data = null;
	if (props.global_word_search === true){
		data = (props.words.map(word => {
			return (<Card key={word.id+"words"} className="shadow-sm rounded-0">
                        <CardBody className="d-flex flex-column">
                            <CardText className="text-center">
                                <br />{word.name}
                                <br />{word.pronunciation}
                                <br />Category: [{word.category.map(category => (category.name+" "))}]
                                <br />{word.translation}
                            </CardText>
                            <button name={word.id} className="btn btn-link align-self-end" onClick={props.add_global}>Add</button>
                        </CardBody>
                    </Card>);
		}));
	} else if(props.google_translate_search === true){
		data += (props.words.map(word => {
			return (<Card key={word.id+"words"} className="shadow-sm rounded-0">
                        <CardBody className="d-flex flex-column">
                            <CardText className="text-center">
                                <br />{word.name}
                                <br />{word.pronunciation}
                                <br />{word.translation}
                            </CardText>
                        <button className="btn btn-link align-self-end" onClick={(e) => {props.choose_category(word.name, word.pronuciation, word.translation)}}>Add</button>
                        </CardBody>
                    </Card>);
		}));
	}
	
	return(<div className="col-10 d-flex flex-column px-0 justify-content-center align-items-center">
				<form className="d-flex flex-column w-100">
					<div className="form-group">
						<label htmlFor="search">Type word:</label>
						<input id="search" type="text" className="custom-form-control" value={props.search_word} name="search_word" onChange={props.handleChange}/>
					</div>
                    <button className="custom-btn theme-primary mb-2 align-self-center" onClick={props.search}>Search</button>
				</form>
                <CardDeck className="w-100">
                    {data}
                </CardDeck>
                <AddwordsTypeModalComponent add_custom={props.add_custom}
                                            handleChange={props.handleChange}
                                            cats={props.cats}
                                            modal={props.modal}
                                            toggle_modal={props.toggle_modal} />
		</div>);
};