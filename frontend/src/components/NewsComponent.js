import React from 'react';
import { Card, CardTitle, CardText, CardGroup, CardSubtitle, CardBody } from 'reactstrap';


export const NewsComponent = (props) => {
    return(<CardGroup className="px-2 align-self-start">
                {props.articles.map((article, index) => {
                return (<Card key={index} className="shadow-sm">
                            <CardBody>
                                <CardTitle>{article.title}</CardTitle>
                                <CardSubtitle>{article.pub_date}</CardSubtitle>
                                <CardText>{article.text}</CardText>
                            </CardBody>
                        </Card>)
            })}
           </CardGroup>);
};