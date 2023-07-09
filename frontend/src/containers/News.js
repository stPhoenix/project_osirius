import React, {Component} from 'react';
import {get_news} from '../api';
import {NewsComponent} from '../components';

export default class News extends Component{
    constructor(props){
        super(props);
        this.state = {articles:[]};
        this.fetch_news = this.fetch_news.bind(this);
    }
    
    componentDidMount(){
        get_news().then(api_response => (this.fetch_news(api_response)));
    };
    
    fetch_news(news){
        if (news.result === true){
            this.setState({articles: news.data.results});
        }
        
    };
    
    render(){
        if (this.state.articles.length === 0){
            return null;
        }
        
        return(
            <NewsComponent articles={this.state.articles} />
        );
    }
};