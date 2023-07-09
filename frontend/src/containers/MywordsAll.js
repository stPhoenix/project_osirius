import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {add_alert} from '../actions/alert';
import {get_user_words, delete_word as api_delete_word} from '../api';
import {MywordsAllComponent} from '../components';
import PropTypes from 'prop-types';


const classProps = {
    dispatch: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

class MywordsAll extends Component {
    constructor(props){
        super(props);
        this.dispatch = this.props.dispatch;
        this.token = this.props.token;
        this.state = {
            words: [],
			selected: [],
            totalPages: 1,
            currentPage: 1,
        };
        this.delete_word = this.delete_word.bind(this);
        this.delete_all = this.delete_all.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
		this.delete_selected = this.delete_selected.bind(this);
        this.load_words_page = this.load_words_page.bind(this);
    };

    load_words_page(page=1){
        this.dispatch(add_alert());
        get_user_words(page, this.token)
            .then(api_response => {
                if (api_response.result){
                    this.setState({words: api_response.data.results,
                                        totalPages: api_response.data.total_pages,
                                        currentPage: page});
                }else{
                    this.dispatch(add_alert({color: "danger", text: api_response.message}));
                }
        });
    };

    componentDidMount(){
		this.load_words_page();
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
        api_delete_word(id, this.token)
            .then(api_response => {
                if (api_response.result) {
                    const words = this.state.words.filter((word) => (parseInt(id, 10) !== word.id));
                    this.setState({words});
                }
                const color = (api_response.result) ? "success" : "danger";
                this.dispatch(add_alert({color, text: api_response.message}))
        })
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
													 handleCheck={this.handleCheck}
                                                     load_words_page={this.load_words_page}
        />);
    };
};

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated
    };
};

MywordsAll.propTypes = classProps;

export default connect(mapStateToProps)(MywordsAll);