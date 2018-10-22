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
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
        isOpen: false
        };
  }
    toggle() {
        this.setState({
        isOpen: !this.state.isOpen
    });
  }
    componentDidMount(){
        check_token(this.props.dispatch, this.props.auth.isAuthenticated);
    };
    render(){
        const {isAuthenticated} = this.props.auth;
        return (<NavBarComponent isAuthenticated={isAuthenticated} toggle={this.toggle} isOpen={this.state.isOpen} />)
    }
}

const matchStateToProps = (state) => ({auth: state.auth});

NavBar.propTypes = classProps;

export default connect(matchStateToProps)(NavBar);