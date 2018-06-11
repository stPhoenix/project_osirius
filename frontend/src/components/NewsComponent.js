import React from 'react';
import { Card, CardTitle, CardText, CardSubtitle, CardBody, CardColumns } from 'reactstrap';
import {ContentComponent} from '../components';


export const NewsComponent = (props) => {
    return(<ContentComponent><div className="row flex-column flex-lg-row px-0">
                {props.articles.map((article, index) => {
                return (
                    <div key={index} className="col-12 col-lg-4 p-1">
                        <Card className="shadow-sm rounded-0">
                            <CardBody>
                                <CardTitle>{article.title}</CardTitle>
                                <CardSubtitle>{article.pub_date}</CardSubtitle>
                                <CardText>{article.text}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                        )
            })}
            </div>
           </ContentComponent>);
};