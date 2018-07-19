import React from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import allwords from '../assets/allwords.png';
import learned from '../assets/learned.png';
import './AppComponent.css';
import MywordsAll from '../containers/MywordsAll';
import MywordsLearned from '../containers/MywordsLearned';
import {ContentComponent} from '../components';
import PropTypes from 'prop-types';

const componentProps = {
    location: PropTypes.object,
};

export const MywordsComponent = ({location}) => {
	if (location.pathname !== "/mywords"){
		return (<Switch>
					<Route path="/mywords/all" component={MywordsAll} />
					<Route path="/mywords/learned" component={MywordsLearned} />
				</Switch>);	
	};
	return(<ContentComponent>
		<img src={allwords} alt="allwords" style={{height:'6rem', width:'auto'}} />
		<h4 className="opacity-50 text-center px-2 mb-4 mt-0">All your words on active learn language.</h4>
		<Link className="custom-btn theme-primary px-3 py-1 mb-5 black" to="/mywords/all" > Look all words</Link>
            
        <img src={learned} alt="learned" className="mt-3" style={{height:'6rem', width:'auto'}} />
		<h4 className="opacity-50 text-center px-2 mb-4 mt-0">Your learned words on active learn language.</h4>
		<Link className="custom-btn theme-primary px-3 py-1 mb-3 black" to="/mywords/learned" > Look learned</Link>
	</ContentComponent>
		);
};

MywordsComponent.propTypes = componentProps;