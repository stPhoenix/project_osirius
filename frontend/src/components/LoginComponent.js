import React from 'react';
import './AppComponent.css';
import {ContentComponent} from '../components';
import PropTypes from 'prop-types';

const componentProps = {
    onChange: PropTypes.func,
    click: PropTypes.func,
};

export const LoginComponent = (props) => {
	return(
    <ContentComponent>
		<form className="col-12 col-md-6 col-lg-4 d-flex flex-column">
            <input className="m-2 custom-form-control" type="text" name="username" id="username" placeholder="Enter username" onChange={props.onChange}/>
            <input className="m-2 custom-form-control" type="password" name="password" id="upassword" placeholder="Enter password" onChange={props.onChange}/>
			<button className="custom-btn theme-primary m-2 px-4 align-self-center" onClick={props.click}>Login</button>
		</form>
    </ContentComponent>
	);
}

LoginComponent.propTypes = componentProps;