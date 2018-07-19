import React, {Component} from 'react';
import {add_alert} from '../actions/alert';
import {update_user, get_langs, change_password} from '../api';
import {login} from '../actions/auth';
import {SettingsComponent} from '../components';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import PropTypes from 'prop-types';


const classProps = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

class Settings extends Component {
	constructor(props){
		super(props);
		this.state = {
			username:this.props.auth.user.username,
			email:this.props.auth.user.email,
			first_name:this.props.auth.user.first_name,
			language_set:this.props.auth.user.language_set,
			current_language:this.props.auth.user.current_language,
			langs:[],
            temp_language: "",
            modal: false,
            password1: "",
            password2: "",
            password: "",
		};
		this.dispatch = this.props.dispatch;
        this.token = this.props.auth.token;
		this.handleChange = this.handleChange.bind(this);
		this.change_password = this.change_password.bind(this);
        this.save = this.save.bind(this);
        this.delete_language = this.delete_language.bind(this);
        this.set_active = this.set_active.bind(this);
        this.add_learn_language = this.add_learn_language.bind(this);
        this.toggle_modal = this.toggle_modal.bind(this);
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
	
	save(e){
		e.preventDefault();
		this.dispatch(add_alert());
		update_user({username: this.state.username,
                     email: this.state.email,
                     first_name: this.state.first_name,
                     language_set: this.state.language_set,
                     current_language: this.state.current_language}
                    , this.token)
        .then(api_response => {
            let color = "primary";
            if (api_response.result === true){
                color = "success";
                this.dispatch(login(api_response.data.token, api_response.data.user));
            } else {
                color = "danger";
            }
            this.dispatch(add_alert({color:color, text:api_response.message}));  
        });
	};
    
    change_password(e) {
		e.preventDefault();
		this.setState({modal:false});
	  	this.dispatch(add_alert());
		change_password(this.state.password1, this.state.password2, this.state.password, this.token)
            .then(api_response => {
                let color = "primary";
		        color = (api_response.result === true) ? "success" : "danger";
		        this.dispatch(add_alert({color:color, text:api_response.message}));

        });		
    };

    delete_language(e) {
		e.preventDefault();
        const language_set = this.state.language_set.filter((language) => (language.name !== e.target.name));
        this.setState({language_set});
    };
    
    set_active(e) {
		e.preventDefault();
        const current_language = e.target.name;
        this.setState({current_language});
    }
	
    add_learn_language(e) {
        e.preventDefault();
        const new_language = this.state.langs.find((lang) => (lang.name === this.state.temp_language));
        const language_set = [...this.state.language_set, new_language];
        this.setState({language_set});
    };
    
    toggle_modal(e) {
      e.preventDefault();
      const modal = !this.state.modal;
      this.setState({modal});  
    };
    
	render(){
		if(!this.props.auth.isAuthenticated){
			return (<Redirect to="/news" />);
		}	
		return (
			<SettingsComponent {...this.state} handleChange={this.handleChange}
                                               click={this.save}
                                               change_password={this.change_password}
                                               add_learn_language={this.add_learn_language}
                                               delete_language={this.delete_language}
                                               set_active={this.set_active}
                                               toggle_modal={this.toggle_modal}/>
		);
	};
};

const mapStateToProps = (state) => ({auth: state.auth});

Settings.propTypes = classProps;

export default connect(mapStateToProps)(Settings);