import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavBarComponent} from '../components';
import {check_token} from '../actions/auth';
import PropTypes from 'prop-types';


const classProps = {
    dispatch: PropTypes.func.isRequired,
    auth: PropTypes.object,
};

class NavBar extends Component{
    componentDidMount(){
        check_token(this.props.dispatch, this.props.auth.isAuthenticated);
    };
    render(){
        const {isAuthenticated} = this.props.auth;
        return (<NavBarComponent isAuthenticated={isAuthenticated} />)
    }
}

const matchStateToProps = (state) => ({auth: state.auth});

NavBar.propTypes = classProps;

export default connect(matchStateToProps)(NavBar);