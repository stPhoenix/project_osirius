import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {add_alert} from '../actions/alert';
import {get_learned_words, learn_again_word} from '../api';
import {MywordsLearnedComponent} from '../components';


class MywordsLearned extends Component {
    constructor(props){
        super(props);
        this.dispatch = this.props.dispatch;
        this.token = this.props.token;
        this.state = {
            words: [],
			selected: []
        };
        this.learn_word = this.learn_word.bind(this);
        this.learn_all = this.learn_all.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
		this.learn_selected = this.learn_selected.bind(this);
    };
    
    componentDidMount(){
		this.dispatch(add_alert());
        get_learned_words(this.token)
            .then(api_response => {
                if (api_response.result){
                    this.setState({words: api_response.data});
                }else{
                    this.dispatch(add_alert({color: "danger", text: api_response.message}));   
                } 
        });
    };
	
	handleCheck(e) {
		let selected;
		if (e.target.checked){
			selected = [...this.state.selected, e.target.name];
		} else {
			selected = this.state.selected.filter((id) => (id !== e.target.name));
		}
		this.setState({selected});
	};
    
    learn_word(id) {
        this.dispatch(add_alert());
		const request = learn_again_word(id, this.token);
		if (request.result) {
			this.dispatch(add_alert({color: "success", text: request.message}));
			const words = this.state.words.filter((word) => (word.id !== id));
			this.setState({words});
		} else {
			this.dispatch(add_alert({color: "danger", text: request.message}));
		}
    };
    
    learn_all(e) {
        e.preventDefault();
        this.state.words.forEach((word) => {
            this.learn_word(word.id);
        });
    };
	
	learn_selected(e) {
		e.preventDefault();
        this.state.selected.forEach((word) => {
            this.learn_word(word);
        });
	};
    
    render(){
       if (!this.props.isAuthenticated){
            return (<Redirect to="/login" />);
        }
        return (<MywordsLearnedComponent {...this.state} learn_selected={this.learn_selected}
                                                     learn_all={this.learn_all}
													 handleCheck={this.handleCheck} />);
    };
};

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated
    };
};

export default connect(mapStateToProps)(MywordsLearned);