import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {add_alert} from '../actions/alert';
import {add_global_word, get_cats, get_words_by_cat} from '../api';
import {AddwordsPresetsComponent} from '../components';


class AddwordsPresets extends Component {
    constructor(props){
        super(props);
        this.dispatch = this.props.dispatch;
        this.token = this.props.token;
        this.state = {
            cats: [],
            words: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.add_global = this.add_global.bind(this);
        this.add_all = this.add_all.bind(this);
    };
    
    componentDidMount(){
        const request = get_cats(this.token);
        if (request.result){
            this.setState({cats: request.data});
            const category = request.data.find((category) => (category.name === "Default"));
            this.dispatch(add_alert());
            const req = get_words_by_cat(category.id, this.token);
            if (req.result){
                this.setState({words: req.data});
            }else{
                    this.dispatch(add_alert({color: "danger", text: req.message}));   
            }
        }else{
            this.dispatch(add_alert({color: "danger", text: request.message}));   
        }
    };
    
    handleChange(e){
        e.preventDefault();
        this.setState({words: []});
        const category = this.state.cats.find((category) => (category.name === e.target.value));
        this.dispatch(add_alert());
        const request = get_words_by_cat(category.id, this.token);
        if (request.result){
            this.setState({words: request.data});
        }else{
            this.dispatch(add_alert({color: "danger", text: request.message}));   
        }
    };
    
    add_global(e) {
        e.preventDefault();
        this.dispatch(add_alert());
        const request = add_global_word(e.target.name, this.token);
        const color = (request.result) ? "success" : "danger";
        this.dispatch(add_alert({color, text:request.message}));
    };
    
    add_all(e) {
        e.preventDefault();
        this.state.words.forEach((word) => {
            e.target.name = word.id;
            this.add_global(e);
        });
    };
    
    render(){
       if (!this.props.isAuthenticated){
            return (<Redirect to="/login" />);
        }
        
        return (<AddwordsPresetsComponent {...this.state} handleChange={this.handleChange}
                                                          add_global={this.add_global}
                                                          add_all={this.add_all} />);
    };
};

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated
    };
};

export default connect(mapStateToProps)(AddwordsPresets);