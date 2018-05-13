import React, {Component} from 'react';
import CustomAlert from './CustomAlert';
import {connect} from 'react-redux';
import {Alert} from 'reactstrap';


class Alerts extends Component {
    render(){
        const {alerts} = this.props;
        if (alerts.length === 0){
            return <Alert color="primary" style={{top:"-50px"}} className="w-100 d-flex justify-content-center py-2 rounded-0"> Placeholder </Alert>;
        }
        else{
            console.log(this.props);
            const {color, text, key} = this.props.alerts[0]; 
            return (<CustomAlert color={color} text={text} key={key} pk={key} />);
        }
    }
}

const matchStateToProps = (state) => ({alerts: state.alert.alerts});

export default connect(matchStateToProps)(Alerts);