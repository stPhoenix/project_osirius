import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CustomAlertComponent} from '../components';
import {toggle_alert, delete_alert} from '../actions/alert';

class CustomAlert extends Component {
    constructor(props) {
        super(props);
        this.dispatch = this.props.dispatch;
        this.key = this.props.pk;
        this.onDismiss = this.onDismiss.bind(this);
        this.onEntered = this.onEntered.bind(this);
        this.onExited = this.onExited.bind(this);
    };
    
    onDismiss() {
        this.dispatch(toggle_alert());
    };
    
    onEntered() {
      if (this.props.color){
            setTimeout(this.onDismiss, 3000);  
        };  
    };
    
    onExited() {
        this.dispatch(delete_alert(this.key));
        this.dispatch(toggle_alert());
    }
    
    render() {
      const {color, text} = this.props;
      return (
        <CustomAlertComponent visible={this.props.visible} color={color} text={text} onExited={this.onExited} onEntered={this.onEntered} />
      );  
    };
}

const matchStateToProps = (state) => ({visible: state.alert.visible});

export default connect(matchStateToProps)(CustomAlert);