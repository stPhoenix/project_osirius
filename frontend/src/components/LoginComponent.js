import React from 'react';
import './AppComponent.css';
import {ContentComponent} from '../components';


export const LoginComponent = (props) => {
	return(
    <ContentComponent>
		<form className="col-12 col-md-6 col-lg-4 d-flex flex-column">
            <input className="m-2 custom-form-control" type="text" name="username" id="username" placeholder="Enter username"/>
            <input className="m-2 custom-form-control" type="password" name="password" id="upassword" placeholder="Enter password"/>
			<button className="custom-btn theme-primary m-2 px-4 align-self-center" onClick={props.click}>Login</button>
		</form>
    </ContentComponent>
	);
}