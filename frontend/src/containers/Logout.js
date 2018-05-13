import React, {Component} from 'react';
import {logout} from '../api';
import {add_alert} from '../actions/alert';
import {logout as logout_action} from '../actions/auth';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';


class Logout extends Component {
    constructor(props){
        super(props);
        this.dispatch = this.props.dispatch;
        this.token = this.props.token;
    };
    
    componentDidMount(){
        this.dispatch(add_alert());
        const l = logout(this.token);
        if (l.result === true){
            this.dispatch(add_alert({color:"success", text:"Success"}))
            this.dispatch(logout_action());
        } else {
            this.dispatch(add_alert({color:"danger", text:"Something went wrong"}))
        }
    };
    
    render(){
        return(<Redirect to="/" />);
    };
}

const mapStateToProps = (state) => ({token: state.auth.token});

export default connect(mapStateToProps)(Logout);