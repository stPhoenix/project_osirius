import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {add_alert} from '../actions/alert';
import {play_matching, result_play_matching} from '../api';
import {WordstrainerMatchComponent} from '../components';
import PropTypes from 'prop-types';


const classProps = {
    dispatch: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    reverse: PropTypes.bool.isRequired,
};

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
		const user_answer = parseInt(e.target.name, 10);
		const result = right_answer === user_answer;
		if (result) {
			this.dispatch(add_alert({color: "success", text: "Right"}));
			result_play_matching(this.state.answer.id, user_answer, this.reverse, this.token)
                .then(api_response => {
                    if (api_response.result === false) {
				        this.dispatch(add_alert({color: "danger", text: api_response.message}));
			         }
		            });
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
	};
	
	next_word() {
		this.dispatch(add_alert());
		play_matching(this.reverse, this.token)
            .then(api_response => {
                if (api_response.result){
                    const question = (this.reverse) ? api_response.data.answer.translation : api_response.data.answer.name;
                    const words = api_response.data.words.map((word) =>{
                        const active = (this.reverse) ? word.name : word.translation;
                        return {...word, color: "", active};
                    });
			        this.setState({words,
						        question,
                                answer: api_response.data.answer
						      });
		          } else{
			         this.dispatch(add_alert({color: "danger", text: api_response.message}));
                      this.setState({words: []});
		          }
            });
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