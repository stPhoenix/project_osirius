import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavBarComponent} from '../components';
import {check_token} from '../actions/auth';


class NavBar extends Component{
    componentDidMount(){
        check_token(this.props.dispatch, this.props.isAuthenticated);
    };
    render(){
        const {isAuthenticated} = this.props.auth;
        return (<NavBarComponent isAuthenticated={isAuthenticated} />)
    }
}

const matchStateToProps = (state) => ({auth: state.auth});

export default connect(matchStateToProps)(NavBar);