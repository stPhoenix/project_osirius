import React, {Component} from 'react';
import {logout} from '../api';
import {add_alert} from '../actions/alert';
import {logout as logout_action} from '../actions/auth';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


const classProps = {
    dispatch: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
};

class Logout extends Component {
    constructor(props){
        super(props);
        this.dispatch = this.props.dispatch;
        this.token = this.props.token;
    };
    
    componentDidMount(){
        this.dispatch(add_alert());
        logout(this.token)
            .then(api_response => {
                 if (api_response.result === true){
                    this.dispatch(add_alert({color:"success", text:api_response.message}))
                    this.dispatch(logout_action());
                } else {
                    this.dispatch(add_alert({color:"danger", text:api_response.message}))
                }
            });
    };
    
    render(){
        return(<Redirect to="/" />);
    };
}

const mapStateToProps = (state) => ({token: state.auth.token});

Logout.propTypes = classProps;

export default connect(mapStateToProps)(Logout);