import React from 'react';
import {Link} from 'react-router-dom';
import typing from '../assets/typing.png';
import presets from '../assets/presets.png';
import './AppComponent.css';


export const AddwordsComponent = () => {
	return(<div>
		<img src={typing} />
		<p>Add words by typing</p>
		<button className="custom-btn"> <Link to="/typing">Add words</Link></button>
	</div>
		);
};