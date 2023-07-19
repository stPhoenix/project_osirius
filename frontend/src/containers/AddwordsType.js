import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {add_custom_word, add_global_word, get_cats, search_word} from '../api';
import {add_alert} from '../actions/alert';
import {AddwordsTypeComponent} from '../components';
import PropTypes from 'prop-types';


const classProps = {
    dispatch: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

class AddwordsType extends Component {
    constructor(props){
        super(props);
        this.dispatch = this.props.dispatch;
        this.token = this.props.token;
        this.state = {
            global_word_search: false,
            google_translate_search: false,
            words: [],
            search_word: "",
            customName: "",
            customPronunciation: "",
            customTranslation: "",
            category: "Default",
            cats: [],
        };
        this.search = this.search.bind(this);
        this.add_global = this.add_global.bind(this);
        this.add_custom = this.add_custom.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    componentDidMount() {
        get_cats(this.token)
            .then(api_response => {
                if (api_response.result) {
                    this.setState({cats: api_response.data});
                } else {
                    this.dispatch(add_alert({color: "danger", text: api_response.message}));
                }
            });
    };
    
    handleChange(e) {
        this.setState({[e.target.name]:e.target.value});
    };
    
    add_custom(e) {
        e.preventDefault();
        this.setState({modal: false});
        const word = {
            word_name: this.state.customName,
            pronunciation: this.state.customPronunciation,
            translation: this.state.customTranslation,
            category: this.state.category
        };
        this.dispatch(add_alert());
        add_custom_word(word, this.token)
            .then(api_response => {
                const color = (api_response.result) ? "success" : "danger";
                this.dispatch(add_alert({color, text:api_response.message}));
        });
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
    
    search(e) {
        e.preventDefault();
        this.dispatch(add_alert());
        search_word(this.state.search_word, this.token)
            .then(api_response => {
                if (api_response.result) {
                    this.setState({...api_response.data});
                    if (api_response.data.google_translate_search && api_response.data.words.length > 0) {
                        const word = api_response.data.words[0];
                        this.setState({
                            customName: word.name,
                            customPronunciation: word.pronunciation,
                            customTranslation: word.translation,
                            category: "Default",
                        })
                    }
                }else{
                    this.dispatch(add_alert({color:"danger", text:api_response.message}));   
                }
        });
    };
    
    render(){
        if (!this.props.isAuthenticated){
            return (<Redirect to="/login" />);
        }
        return (
            <AddwordsTypeComponent {...this.state} handleChange={this.handleChange}
                                   search={this.search}
                                   add_global={this.add_global}
                                   add_custom={this.add_custom}
                                   choose_category={this.choose_category}
                                   customName={this.state.customName}
                                   customPronunciation={this.state.customPronunciation}
                                   customTranslation={this.state.customTranslation}
                                   category={this.state.category}

            />
        );
    };
};

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated
    };
};

AddwordsType.propTypes = classProps;

export default connect(mapStateToProps)(AddwordsType);