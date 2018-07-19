import React from 'react';
import {Link, Switch, Route} from 'react-router-dom';
import typing from '../assets/typing.png';
import matching from '../assets/matching.png';
import './AppComponent.css';
import {ContentComponent} from '../components';
import WordstrainerType from '../containers/WordstrainerType';
import WordstrainerMatch from '../containers/WordstrainerMatch';
import PropTypes from 'prop-types';

const componentProps = {
    location: PropTypes.object,
};

export const WordstrainerComponent = ({location}) => {
	if (location.pathname !== "/wordstrainer"){
		return (<Switch>
					<Route path="/wordstrainer/type/reverse" render={() => (<WordstrainerType reverse={true} />)} />
					<Route path="/wordstrainer/match/reverse" render={() => (<WordstrainerMatch reverse={true} />)} />
                    <Route path="/wordstrainer/type" render={() => (<WordstrainerType reverse={false} />)} />
					<Route path="/wordstrainer/match" render={() => (<WordstrainerMatch reverse={false} />)} />
				</Switch>);	
	};
	return(<ContentComponent>
			<img src={matching} alt="matching" style={{height:'6rem', width:'auto'}} />
			<h4 className="opacity-50 text-center px-3 mb-4 mt-0">Match word with translation.</h4>
			<Link className="custom-btn theme-primary px-4 py-1 mb-3 black" to="/wordstrainer/match" > Play</Link>
			
			<img src={matching} alt="matching" className="mt-3" style={{height:'6rem', width:'auto'}} />
			<h4 className="opacity-50 text-center px-3 mb-4 mt-0">Match translation with word.</h4>
			<Link className="custom-btn theme-primary px-4 py-1 mb-3 black" to="/wordstrainer/match/reverse" > Play</Link>
            
        	<img src={typing} alt="typing" className="mt-3" style={{height:'7rem', width:'auto'}} />
			<h4 className="opacity-50 text-center px-2 mb-4 mt-0">Look at word and type translation.</h4>
			<Link className="custom-btn theme-primary px-4 py-1 mb-3 black" to="/wordstrainer/type" > Play</Link>
			
			<img src={typing} alt="typing" className="mt-3" style={{height:'7rem', width:'auto'}} />
			<h4 className="opacity-50 text-center px-2 mb-4 mt-0">Look at translation and type word.</h4>
			<Link className="custom-btn theme-primary px-4 py-1 mb-3 black" to="/wordstrainer/type/reverse" > Play</Link>
		</ContentComponent>
		);
};

WordstrainerComponent.propTypes = componentProps;