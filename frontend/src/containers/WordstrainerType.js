import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {add_alert} from '../actions/alert';
import {play_typig, result_play_typing} from '../api';
import {WordstrainerTypeComponent} from '../components';


class Learnwords extends Component {
    constructor(props){
        super(props);
        this.dispatch = this.props.dispatch;
        this.token = this.props.token;
		this.reverse = this.props.reverse;
        this.state = {
            word: {},
			answer: ""
        };
    };
    
    componentDidMount(){
    };
    
    render(){
       if (!this.props.isAuthenticated){
            return (<Redirect to="/login" />);
        }
        return (<WordstrainerType />);
    };
};

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated
    };
};

export default connect(mapStateToProps)(Learnwords);