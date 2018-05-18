import React from 'react';
import './AppContainer.css';


export const AddwordsTypeComponent = (props) => {
	
	let data = null;
	if (props.global_word_search === true){
		data = (props.words.map(word => {
			
		}));
	} else if(google_translate_search === true){
		
	} else{
		
	}
	
	return(<div className="flex flex-column">
				<form>
					<div className="form-group">
						<label for="search" className="custom-form-control">Type word:</label>
						<input id="search" type="text" className="custom-form-control" value={props.search_word} name="search_word" onChange={props.handleChange}/>
						<button className="custom-btn theme-primary" onClick={props.search}>Search</button>
					</div>
				</form>
		
		
		</div>);
};