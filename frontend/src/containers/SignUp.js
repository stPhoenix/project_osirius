import React, {Component} from 'react';
import {add_alert} from '../actions/alert';
import {sign_up, get_langs} from '../api';
import {login} from '../actions/auth';
import {Redirect} from 'react-router';
import {SignUpComponent} from '../components';
import {connect} from 'react-redux';


class SignUp extends Component {
	constructor(props){
		super(props);
		this.state = {
			username:"",
			password1:"",
			password2:"",
			email:"",
			first_name:"",
			home_language:"",
			current_language:"",
			langs:[]
		};
		this.dispatch = this.props.dispatch;
		this.handleChange = this.handleChange.bind(this);
		this.register = this.register.bind(this);
	};
	
	componentDidMount(){
		const request = get_langs();
		if (request.result === true){
			this.setState({langs: request.data});
		} else {
			this.dispatch(add_alert({color: "danger", text: request.message}));
		}
	};
	
	handleChange(e){
		this.setState({[e.target.name]:e.target.value});
		console.log(this.state);
	};
	
	register(e){
		e.preventDefault();
		this.dispatch(add_alert());
		const request = sign_up(...this.state);
		let color = "primary"
		if (request.result === true){
			color = "success";
			this.dispatch(login(...request.data));
		} else {
			color = "danger";
		}
		this.dispatch(add_alert({color:color, text:request.message}));
	};
	
	render(){
		if(this.props.isAuthenticated){
			return (<Redirect to="/news" />);
		}	
		return (
			<SignUpComponent {...this.state} handleChange={this.handleChange} click={this.register}  />
		);
	};
};

const mapStateToProps = (state) => ({isAuthenticated: state.auth.isAuthenticated});

export default connect(mapStateToProps)(SignUp);