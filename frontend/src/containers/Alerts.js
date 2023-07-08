import React, {Component} from 'react';
import {connect} from 'react-redux';
import {UncontrolledAlert} from 'reactstrap';
import {CustomAlert} from './CustomAlert';
import PropTypes from 'prop-types';


const classProps = {
    alerts: PropTypes.array,
};

class Alerts extends Component {
    render(){
        const {alerts} = this.props;
        return(
            <div className="d-flex flex-column fixed-top">
                {alerts.map(alert => {
                    return (<CustomAlert key={alert.key} pk={alert.key} color={alert.color} visible={true}
                                         dispatch={this.props.dispatch} text={alert.text}/>)
                                    })}
            </div>
        );
    }
}

const matchStateToProps = (state) => ({alerts: state.alert.alerts});

Alerts.propTypes = classProps;

export default connect(matchStateToProps)(Alerts);