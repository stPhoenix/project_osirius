import React, {Component} from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import './AppComponent.css';


export const LoginComponent = () => {
	return(
		<Form>
			<FormGroup>
				<Label for="username">Username</Label>
				<Input type="text" name="username" id="username" placeholder="Enter username"/>
			</FormGroup>
			<FormGroup>
				<Label for="upassword">Password</Label>
				<Input type="password" name="password" id="upassword" placeholder="Enter password"/>
			</FormGroup>
			<Button color="theme-primary" className="theme-primary">Login</Button>
		</Form>
	);
}