import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {add_custom_word, add_global_word, get_cats, search_word} from '../api';
import {add_alert} from '../actions/alert';
import {AddwordsTypeComponent} from '../components';


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
            modal: false,
            custom_word: {},
            category: "Default",
            cats: [],
        };
        this.search = this.search.bind(this);
        this.add_global = this.add_global.bind(this);
        this.add_custom = this.add_custom.bind(this);
        this.toggle_modal = this.toggle_modal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.choose_category = this.choose_category.bind(this);
    };
    
    toggle_modal(e) {
        this.setState({modal:!this.state.modal});
    };
    
    choose_category(name, pronunciation, translation) {
        get_cats(this.token)
            .then(api_response => {
                if (api_response.result){
                    this.setState({cats:api_response.data});
                }else{
                    this.dispatch(add_alert({color: "danger", text: api_response.message}));
                }    
                this.setState({modal:true, custom_word: {
                                                            word_name: name,
                                                            pronunciation,
                                                            translation,
                }});
        });
    };
    
    handleChange(e) {
        this.setState({[e.target.name]:e.target.value});
    };
    
    add_custom(e) {
        e.preventDefault();
        this.setState({modal: false});
        const word = {...this.state.custom_word, category:this.state.category};
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
                                                   toggle_modal={this.toggle_modal}
                                                   choose_category={this.choose_category} />
        );
    };
};

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated
    };
};

export default connect(mapStateToProps)(AddwordsType);