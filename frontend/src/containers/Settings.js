import React, {Component} from 'react';
import {add_alert} from '../actions/alert';
import {update_user, get_langs} from '../api';
import {login} from '../actions/auth';
import {SettingsComponent} from '../components';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';


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
            temp_language: ""
		};
		this.dispatch = this.props.dispatch;
        this.token = this.props.auth.token;
		this.handleChange = this.handleChange.bind(this);
		this.change_password = this.change_password.bind(this);
        this.save = this.save.bind(this);
        this.delete_language = this.delete_language.bind(this);
        this.set_active = this.set_active.bind(this);
        this.add_learn_language = this.add_learn_language.bind(this);
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
	};
	
	save(e){
		e.preventDefault();
		this.dispatch(add_alert());
		const request = update_user(this.state, this.token);
		let color = "primary"
		if (request.result === true){
			color = "success";
			this.dispatch(login(request.data.token, request.data.user));
		} else {
			color = "danger";
		}
		this.dispatch(add_alert({color:color, text:request.message}));
	};
    
    change_password(e) {
      return null;  
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
                                               set_active={this.set_active} />
		);
	};
};

const mapStateToProps = (state) => ({auth: state.auth});

export default connect(mapStateToProps)(Settings);