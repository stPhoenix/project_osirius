import React, {Component} from 'react';
import {LoginComponent} from '../components';
import {add_alert} from '../actions/alert';
import {login} from '../actions/auth';
import {connect} from 'react-redux';
import {login as apiLogin} from '../api';
import {Redirect} from 'react-router';


class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            passowrd: ""
        };
        this.login = this.login.bind(this);
        this.dispatch = this.props.dispatch;
        this.onChange = this.onChange.bind(this);
    };
    
    onChange(e){
      this.setState({[e.target.name]: e.target.value});  
    };
    
    login(e){
        e.preventDefault();
        this.dispatch(add_alert());
        const auth = apiLogin(this.state.username, this.state.password);
        if (auth.result) {
            this.dispatch(add_alert({color:"success", "text": auth.message}));
            this.dispatch(login(auth.data.token, auth.data.user));
        }
        else{
           this.dispatch(add_alert({color:"danger", "text": auth.message})); 
        }
        
    };
    
	render(){
        if(this.props.isAuthenticated){
            return <Redirect to="/" />
        }
		return(<LoginComponent click={this.login} username={this.state.username} passowrd={this.state.password} />);
	};
}

const mapStateToProps = (state) => ({isAuthenticated: state.auth.isAuthenticated});

export default connect(mapStateToProps)(Login);