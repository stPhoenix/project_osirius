import {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';


const classProps = {
    location: PropTypes.object.isRequired,
};

class ScrollMain extends Component {
	
	componentDidUpdate(prevProps){
		if (this.props.location !== prevProps.location) {
			const e = document.getElementsByTagName("main");
			e[0].scrollIntoView({block:"start", behavior: "smooth"});
		}	
		
	};
	
	render(){
		return this.props.children;
	};
};

ScrollMain.propTypes = classProps;

export default withRouter(ScrollMain);