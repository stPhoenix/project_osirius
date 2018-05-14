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
        this.fetch_news();
        setInterval(this.fetch_news, 300000);  
    };
    
    fetch_news(){
        const news = get_news();
        if (news.result === true){
            this.setState({articles: news.data});
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