import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {add_alert} from '../actions/alert';
import {get_learn_word, set_learn_word} from '../api';
import {LearnwordsComponent} from '../components';


class Learnwords extends Component {
    constructor(props){
        super(props);
        this.dispatch = this.props.dispatch;
        this.token = this.props.token;
        this.state = {
            word: {}
        };
        this.learned = this.learned.bind(this);
        this.not_learned = this.not_learned.bind(this);
        this.get_word = this.get_word.bind(this);
    };
    
    componentDidMount(){
		this.get_word();
    };
	
	get_word() {
        this.dispatch(add_alert());
        const request = get_learn_word(this.token);
        if (request.result){
            this.setState({word: request.data});
        }else{
            this.dispatch(add_alert({color: "danger", text: request.message}));   
        }
    };
    
    learned(e) {
        e.preventDefault();
        this.dispatch(add_alert());
        const request = set_learn_word(this.token);
        if (request.result){
            this.get_word();
        }else{
            this.dispatch(add_alert({color: "danger", text: request.message}));   
        }
    };
    
    not_learned(e) {
        e.preventDefault();
        this.get_word();
    };
    
    render(){
       if (!this.props.isAuthenticated){
            return (<Redirect to="/login" />);
        }
        return (<LearnwordsComponent {...this.state} learned={this.learned}
                                                     not_learned={this.not_learned} />);
    };
};

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated
    };
};

export default connect(mapStateToProps)(Learnwords);