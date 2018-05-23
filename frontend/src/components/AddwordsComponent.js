import React from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import typing from '../assets/typing.png';
import presets from '../assets/presets.png';
import './AppComponent.css';
import AddwordsType from '../containers/AddwordsType';
import AddwordsPresets from '../containers/AddwordsPresets';


export const AddwordsComponent = ({location}) => {
	if (location.pathname !== "/addwords"){
		return (<Switch>
					<Route path="/addwords/type" component={AddwordsType} />
					<Route path="/addwords/presets" component={AddwordsPresets} />
				</Switch>);	
	};
	return(<div className="d-flex flex-column align-self-center align-items-center justify-content-center">
		<img src={typing} alt="typing" className="w-25" />
		<h4 className="opacity-50 text-center px-2 mb-4 mt-0">Type word. System will search word in database or in the internet.</h4>
		<Link className="custom-btn theme-primary px-3 py-1 mb-5 black" to="/addwords/type" > Add words</Link>
            
        <img src={presets} alt="presets" className="w-25 mt-3" />
		<h4 className="opacity-50 text-center px-2 mb-4 mt-0">Choose word from preset in database.</h4>
		<Link className="custom-btn theme-primary px-3 py-1 mb-3 black" to="/addwords/presets" > Add words</Link>
	</div>
		);
};