import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {add_alert} from '../actions/alert';
import {add_global_word, get_cats, get_learned_words, get_words_by_cat} from '../api';
import {AddwordsPresetsComponent} from '../components';
import PropTypes from 'prop-types';


const classProps = {
    dispatch: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

class AddwordsPresets extends Component {
    constructor(props){
        super(props);
        this.dispatch = this.props.dispatch;
        this.token = this.props.token;
        this.state = {
            cats: [],
            words: [],
			selected: [],
            totalPages: 1,
            currentPage: 1,
        };
        this.activeCategory = 1;
        this.handleChange = this.handleChange.bind(this);
        this.add_global = this.add_global.bind(this);
        this.add_all = this.add_all.bind(this);
		this.handleCheck = this.handleCheck.bind(this);
		this.add_selected = this.add_selected.bind(this);
        this.load_words_page = this.load_words_page.bind(this);
    };
    
    componentDidMount(){
        get_cats(this.token)
            .then(api_response => {
            if (api_response.result){
                this.setState({cats: api_response.data});
                const category = api_response.data.find((category) => (category.name === "Default"));
                this.activeCategory = category.pk;
                this.load_words_page(1);
            }else{
                this.dispatch(add_alert({color: "danger", text: api_response.message}));   
            }
        });
    };

    load_words_page(page=1){
        this.dispatch(add_alert());
        get_words_by_cat(this.activeCategory, page, this.token)
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

    handleChange(e){
        e.preventDefault();
        const category = this.state.cats.find((category) => (category.name === e.target.value));
        this.setState({words: []});
        this.activeCategory = category.pk;

        this.load_words_page(1);
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
    
    add_global(e) {
        e.preventDefault();
        this.dispatch(add_alert());
        add_global_word(e.target.name, this.token)
            .then(api_response => {
                const color = (api_response.result) ? "success" : "danger";
                this.dispatch(add_alert({color, text:api_response.message}));
        });
    };
    
    add_all(e) {
        e.preventDefault();
        this.state.words.forEach((word) => {
            e.target.name = word.id;
            this.add_global(e);
        });
    };
	
	add_selected(e) {
		e.preventDefault();
        this.state.selected.forEach((word) => {
            e.target.name = word;
            this.add_global(e);
        });
	};
    
    render(){
       if (!this.props.isAuthenticated){
            return (<Redirect to="/login" />);
        }
        return (<AddwordsPresetsComponent {...this.state} handleChange={this.handleChange}
                                                          add_selected={this.add_selected}
                                                          add_all={this.add_all}
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

AddwordsPresets.propTypes = classProps;

export default connect(mapStateToProps)(AddwordsPresets);