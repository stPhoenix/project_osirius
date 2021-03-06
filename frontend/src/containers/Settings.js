import React, {Component} from 'react';
import {add_alert} from '../actions/alert';
import {update_user, get_langs, change_password, delete_user as api_delete_user} from '../api';
import {login, logout} from '../actions/auth';
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
            terms_check: this.props.auth.user.terms_check,
            home_language: this.props.auth.user.home_language,
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
        this.handleCheck = this.handleCheck.bind(this);
        this.delete_user = this.delete_user.bind(this);
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
        if(!this.state.terms_check) {
            this.delete_user(e);
        }
        else {
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
                this.dispatch(login(this.token, api_response.data));
            } else {
                color = "danger";
            }
            this.dispatch(add_alert({color:color, text:api_response.message}));  
        });  
        };
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
    
    handleCheck(e){
        const old_state = this.state.terms_check;
        this.setState({terms_check: !old_state});    
        if(!old_state === false) {
            this.dispatch(add_alert({color:"warning", text:"If you don't agree with Privacy Policy your account will be deleted"}));
        };
    };
    
    delete_user(e){
        e.preventDefault();
        api_delete_user(this.props.auth.user.pk, this.token, this.dispatch)
                .then(api_response => {
                    let color = "primary";
                    if (api_response.result === true){
                        color = "success";
                        this.dispatch(logout());
                    } else {
                        color = "danger";
                    };
                    this.dispatch(add_alert({color:color, text:api_response.message}));  
                });  
        
    }

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
                                               toggle_modal={this.toggle_modal}
                                               handleCheck={this.handleCheck}
                                               delete_user={this.delete_user}/>
		);
	};
};

const mapStateToProps = (state) => ({auth: state.auth});

Settings.propTypes = classProps;

export default connect(mapStateToProps)(Settings);