import React from 'react';
import './AppComponent.css';
import {Card, CardBody, CardText} from 'reactstrap';
import {AddwordsTypeModalComponent, ContentComponent} from '../components';


export const AddwordsTypeComponent = (props) => {
	
	let data = [];
	if (props.global_word_search === true){
		data = (props.words.map(word => {
			return (<div key={word.id+"words"} className="col-12 col-lg-3 p-1">
                    <Card className="shadow-sm rounded-0">
                        <CardBody className="d-flex flex-column">
                            <CardText className="text-center">
                                <br />{word.name}
                                <br />{word.pronunciation}
                                <br />Category: [{word.category_set.map(category => (category.name+" "))}]
                                <br />{word.translation}
                            </CardText>
                            <button name={word.id} className="btn btn-link align-self-end" onClick={props.add_global}>Add</button>
                        </CardBody>
                    </Card>
                </div>);
		}));
	} else if(props.google_translate_search === true){
		data = (props.words.map(word => {
			return (<div key={word.id+"words"} className="col-12 col-lg-3 p-1">
                    <Card className="shadow-sm rounded-0">
                        <CardBody className="d-flex flex-column">
                            <CardText className="text-center">
                                <br />{word.name}
                                <br />{word.pronunciation}
                                <br />{word.translation}
                            </CardText>
                        <button className="btn btn-link align-self-end" onClick={(e) => {props.choose_category(word.name, word.pronuciation, word.translation)}}>Add</button>
                        </CardBody>
                    </Card>
                </div>  );
		}));
	}
	return(<ContentComponent>
				<form className="col-lg-8 px-0  d-flex flex-column">
					<div className="form-group">
						<label htmlFor="search">Type word:</label>
						<input id="search" type="text" className="custom-form-control" value={props.search_word} name="search_word" onChange={props.handleChange}/>
					</div>
                    <button className="custom-btn theme-primary mb-2 align-self-center" onClick={props.search}>Search</button>
				</form>
                <div className="col-12 row flex-column flex-lg-row px-0">
                    {data}
                </div>
                <AddwordsTypeModalComponent add_custom={props.add_custom}
                                            handleChange={props.handleChange}
                                            cats={props.cats}
                                            modal={props.modal}
                                            toggle_modal={props.toggle_modal} />
		</ContentComponent>);
};