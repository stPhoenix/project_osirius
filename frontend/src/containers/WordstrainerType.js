import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {add_alert} from '../actions/alert';
import {play_typing, result_play_typing} from '../api';
import {WordstrainerTypeComponent} from '../components';


class WordstrainerType extends Component {
    constructor(props){
        super(props);
        this.dispatch = this.props.dispatch;
        this.token = this.props.token;
		this.reverse = this.props.reverse;
        this.state = {
            word: {},
			answer: "",
			button_text: "Check",
			button_click: null,
			right_answer: "",
			question: ""
        };
		this.handleChange = this.handleChange.bind(this);
		this.proceed_answer = this.proceed_answer.bind(this);
		this.next_word = this.next_word.bind(this);
    };
    
    componentDidMount(){
		this.next_word();
    };
	
	handleChange(e) {
		this.setState({[e.target.name]: e.target.value});	
	};
	
	proceed_answer(e) {
		e.preventDefault();
		this.dispatch(add_alert());
		const right_answer = (this.reverse) ? this.state.word.name : this.state.word.translation;
		const user_answer = this.state.answer;
		const result = this.check_answer(right_answer, user_answer);
		if (result) {
			this.dispatch(add_alert({color: "success", text: "Right"}));
			const request = result_play_typing(this.reverse, this.state.word.id, user_answer, this.token);
			if (request.result === false) {
				this.dispatch(add_alert({color: "danger", text: request.message}));
			}
		} else {
			this.setState({right_answer});
			this.dispatch(add_alert({color: "danger", text: "Wrong"}));
		}
		this.setState({button_text: "Next", button_click: this.next_word});
	};
	
	check_answer(right_answer, user_answer) {
		const r = right_answer.toLowerCase().replace(/ /g, "");
		const u = user_answer.toLowerCase().replace(/ /g, "");
		console.log(r);
		console.log(u);
		return r === u;
	};
	
	next_word() {
		this.dispatch(add_alert());
		const request = play_typing(this.reverse, this.token);
		if (request.result){
			const question = (this.reverse) ? request.data.answer.translation : request.data.answer.name;
			this.setState({word: request.data.answer,
						   question,
						   button_text: "Check",
						   button_click: this.proceed_answer,
						   right_answer: ""
						  });
		} else{
			this.dispatch(add_alert({color: "danger", text: request.message}));
		}
	};
    
    render(){
       if (!this.props.isAuthenticated){
            return (<Redirect to="/login" />);
        }
        return (<WordstrainerTypeComponent {...this.state} handleChange={this.handleChange} />);
    };
};

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated
    };
};

export default connect(mapStateToProps)(WordstrainerType);