import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {add_alert} from '../actions/alert';
import {play_matching, result_play_matching} from '../api';
import {WordstrainerMatchComponent} from '../components';


class WordstrainerMatch extends Component {
    constructor(props){
        super(props);
        this.dispatch = this.props.dispatch;
        this.token = this.props.token;
		this.reverse = this.props.reverse;
        this.state = {
            words: [],
			answer: {},
			question: ""
        };
        console.log(this.props);
		this.proceed_answer = this.proceed_answer.bind(this);
		this.next_word = this.next_word.bind(this);
    };
    
    componentDidMount(){
		this.next_word();
    };
	
	proceed_answer(e) {
		e.preventDefault();
		this.dispatch(add_alert());
		const right_answer = this.state.answer.id;
		const user_answer = parseInt(e.target.name);
		const result = right_answer === user_answer;
		if (result) {
			this.dispatch(add_alert({color: "success", text: "Right"}));
			const request = result_play_matching(this.reverse, this.state.answer.id, user_answer, this.token);
			if (request.result === false) {
				this.dispatch(add_alert({color: "danger", text: request.message}));
			}
		} else {
			this.dispatch(add_alert({color: "danger", text: "Wrong"}));
		}
        const words = this.state.words.map((w) => {
            if (w.id === this.state.answer.id){
                w.color = "alert-success"; 
            } else if(w.id !== this.state.answer.id && w.id === user_answer){
                w.color = "alert-danger";
            }
            return w;
        });
        this.setState({words: [...words]});
        console.log(words);
	};
	
	next_word() {
		this.dispatch(add_alert());
		const request = play_matching(this.reverse, this.token);
		if (request.result){
			const question = (this.reverse) ? request.data.answer.translation : request.data.answer.name;
            const words = request.data.words.map((word) =>{
                const active = (this.reverse) ? word.name : word.translation;
                return {...word, color: "", active};
            });
			this.setState({words,
						   question,
                           answer: request.data.answer
						  });
		} else{
			this.dispatch(add_alert({color: "danger", text: request.message}));
		}
	};
    
    render(){
       if (!this.props.isAuthenticated){
            return (<Redirect to="/login" />);
        }
        return (<WordstrainerMatchComponent {...this.state} proceed_answer={this.proceed_answer}
                                                            next_word={this.next_word} />);
    };
};

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated
    };
};

export default connect(mapStateToProps)(WordstrainerMatch);