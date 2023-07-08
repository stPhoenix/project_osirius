import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CustomAlertComponent} from '../components';
import {toggle_alert, delete_alert} from '../actions/alert';
import PropTypes from 'prop-types';


const classProps = {
    dispatch: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    pk: PropTypes.string.isRequired,
};

export class CustomAlert extends Component {
    constructor(props) {
        super(props);
        this.dispatch = this.props.dispatch;
        this.key = this.props.pk;
        this.onDismiss = this.onDismiss.bind(this);
        this.onExited = this.onExited.bind(this);
        this.alert_visible_time_mseconds = 1500;
    };
    
    onDismiss(e) {
        this.dispatch(delete_alert(this.key));
    };
    
    onExited() {
        this.dispatch(toggle_alert());
    }
    
    render() {
      const {color, text} = this.props;
      setTimeout(() => {this.onDismiss(null)}, this.alert_visible_time_mseconds);
      return (
        <CustomAlertComponent visible={this.props.visible} color={color} text={text} onExited={this.onExited} toggle={this.onDismiss} />
      );  
    };
}

const matchStateToProps = (state) => ({visible: state.alert.visible});

CustomAlert.propTypes = classProps;

export default connect(matchStateToProps)(CustomAlert);