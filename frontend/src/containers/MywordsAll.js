import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {add_alert} from '../actions/alert';
import {get_user_words} from '../api';
import {MywordsAllComponent} from '../components';


class MywordsAll extends Component {
    constructor(props){
        super(props);
        this.dispatch = this.props.dispatch;
        this.token = this.props.token;
        this.state = {
            words: [],
			selected: []
        };
        this.delete_word = this.delete_word.bind(this);
        this.delete_all = this.delete_all.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
		this.delete_selected = this.delete_selected.bind(this);
    };
    
    componentDidMount(){
		this.dispatch(add_alert());
        const request = get_user_words(this.token);
        if (request.result){
            this.setState({words: request.data});
        }else{
            this.dispatch(add_alert({color: "danger", text: request.message}));   
        }
    };
	
	handleCheck(e) {
		let selected;
		if (e.target.checked){
			selected = [...this.state.selected, e.target.name];
		} else {
			selected = this.state.selected.filter((id) => (id !== e.target.name));
		}
		this.setState({selected});
	};
    
    delete_word(id) {
        this.dispatch(add_alert());
    };
    
    delete_all(e) {
        e.preventDefault();
        this.state.words.forEach((word) => {
            this.delete_word(word.id);
        });
    };
	
	delete_selected(e) {
		e.preventDefault();
        this.state.selected.forEach((word) => {
            this.delete_word(word);
        });
	};
    
    render(){
       if (!this.props.isAuthenticated){
            return (<Redirect to="/login" />);
        }
        return (<MywordsAllComponent {...this.state} delete_selected={this.delete_selected}
                                                     delete_all={this.delete_all}
													 handleCheck={this.handleCheck} />);
    };
};

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated
    };
};

export default connect(mapStateToProps)(MywordsAll);