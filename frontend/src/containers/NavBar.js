import React,{Component} from 'react';
import {connect} from 'react-redux';
import NavBarComponent from '../components/NavBarComponent';

class NavBar extends Component{
    render(){
        const {isAuthenticated} = this.props.auth;
        return (<NavBarComponent isAuthenticated={isAuthenticated} />)
    }
}

const matchStateToProps = (state) => ({auth: state.auth});

export default connect(matchStateToProps)(NavBar);