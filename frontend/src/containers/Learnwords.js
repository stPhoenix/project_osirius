import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {add_alert} from '../actions/alert';
import {get_learn_word, set_learn_word} from '../api';
import {LearnwordsComponent} from '../components';
import PropTypes from 'prop-types';


const classProps = {
    dispatch: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

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
        get_learn_word(this.token)
            .then(api_response => {
                if (api_response.result){
                    this.setState({word: api_response.data});
                }else{
                    this.dispatch(add_alert({color: "danger", text: api_response.message}));
                    this.setState({word: {}});
                }
        });
    };
    
    learned(e) {
        e.preventDefault();
        this.dispatch(add_alert());
        set_learn_word(e.target.name, true, this.token)
            .then(api_response => {
                if (api_response.result){
                    this.get_word();
                }else{
                    this.dispatch(add_alert({color: "danger", text: api_response.message}));   
                }
        });
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

Learnwords.propTypes = classProps;

export default connect(mapStateToProps)(Learnwords);