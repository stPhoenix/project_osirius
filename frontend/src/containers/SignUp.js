import React, {Component} from 'react';
import {add_alert} from '../actions/alert';
import {sign_up, get_langs, get_user} from '../api';
import {login} from '../actions/auth';
import {Redirect} from 'react-router';
import {SignUpComponent} from '../components';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


const classProps = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

class SignUp extends Component {
	constructor(props){
		super(props);
		this.state = {
			username:"",
			password1:"",
			password2:"",
			email:"",
			first_name:"Noname",
			home_language:"",
			current_language:"",
			langs:[],
			terms_check: false,
		};
		this.dispatch = this.props.dispatch;
		this.handleChange = this.handleChange.bind(this);
		this.register = this.register.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
	};
	
	componentDidMount(){
		get_langs()
            .then(api_response => {
                if (api_response.result === true){
                    this.setState({langs: api_response.data});
		      } else {
                  this.dispatch(add_alert({color: "danger", text: api_response.message}));
		      }
        });
	};
	
	handleChange(e){
		this.setState({[e.target.name]:e.target.value});
	};

	handleCheck(e) {
        this.setState({terms_check: e.target.checked});
    };
	
	register(e){
		e.preventDefault();
		if (!this.state.terms_check) {
		    this.dispatch(add_alert({color:"danger", text:"Please agree with privacy policy."}));
		    return;
		}
		this.dispatch(add_alert());
		sign_up(this.state)
            .then(api_response => {
                let color = "primary"
		      if (api_response.result === true){
                    color = "success";
                    get_user(api_response.data.key)
                        .then(user => {
                            this.dispatch(login(api_response.data.key, user)); });
		      } else {
                    color = "danger";
                }
                this.dispatch(add_alert({color:color, text:api_response.message}));
});
	};
	
	render(){
		if(this.props.isAuthenticated){
			return (<Redirect to="/news" />);
		}	
		return (
			<SignUpComponent {...this.state} handleChange={this.handleChange} click={this.register} handleCheck={this.handleCheck}  />
		);
	};
};

const mapStateToProps = (state) => ({isAuthenticated: state.auth.isAuthenticated});

SignUp.propTypes = classProps;

export default connect(mapStateToProps)(SignUp);