import React, {Component} from 'react';
import {connect} from 'react-redux';
import {UncontrolledAlert} from 'reactstrap';
import PropTypes from 'prop-types';


const classProps = {
    alerts: PropTypes.array,
};

class Alerts extends Component {
    render(){
        const {alerts} = this.props;
        return(
            <div className="d-flex flex-column align-self-center fixed-bottom">
                {alerts.map(alert => {
                                        return (<UncontrolledAlert className="d-flex align-self-center justify-content-center py-2 my-1 rounded-0" key={alert.key} color={alert.color}>{alert.text}</UncontrolledAlert>)
                                    })}
            </div>
        );
    }
}

const matchStateToProps = (state) => ({alerts: state.alert.alerts});

Alerts.propTypes = classProps;

export default connect(matchStateToProps)(Alerts);