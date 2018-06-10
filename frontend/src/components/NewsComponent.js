import React from 'react';
import { Card, CardTitle, CardText, CardSubtitle, CardBody, CardColumns } from 'reactstrap';
import {ContentComponent} from '../components';


export const NewsComponent = (props) => {
    return(<ContentComponent><CardColumns>
                {props.articles.map((article, index) => {
                return (<Card key={index} className="shadow-sm">
                            <CardBody>
                                <CardTitle>{article.title}</CardTitle>
                                <CardSubtitle>{article.pub_date}</CardSubtitle>
                                <CardText>{article.text}</CardText>
                            </CardBody>
                        </Card>)
            })}
           </CardColumns></ContentComponent>);
};