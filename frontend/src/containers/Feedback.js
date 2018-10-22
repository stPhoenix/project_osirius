import React, {Component} from 'react';
import {FeedbackComponent} from '../components';
import {add_alert} from '../actions/alert';
import {connect} from 'react-redux';
import {send_feedback} from '../api';
import PropTypes from 'prop-types';


const classProps = {
    dispatch: PropTypes.func.isRequired,
};

class Feedback extends Component{
    constructor(props){
        super(props);
        this.state = {
            p_name: "",
            email: "",
            p_text: "",
        };
        this.send_f = this.send_f.bind(this);
        this.dispatch = this.props.dispatch;
        this.onChange = this.onChange.bind(this);
    };
    
    onChange(e){
      this.setState({[e.target.name]: e.target.value});  
    };
    
    send_f(e){
        e.preventDefault();
        this.dispatch(add_alert());
        send_feedback(this.state.p_name, this.state.email, this.state.p_text)
            .then(api_response => {
                if (api_response.result) {
                    this.dispatch(add_alert({color:"success", "text": api_response.message}));
                }
                else{
                    this.dispatch(add_alert({color:"danger", "text": api_response.message})); 
                }

        });        
    };
    
	render(){
		return(<FeedbackComponent click={this.send_f} p_name={this.state.p_name} email={this.state.email} p_text={this.state.p_text} onChange={this.onChange} />);
	};
}

Feedback.propTypes = classProps;

export default connect()(Feedback);