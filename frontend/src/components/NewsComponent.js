import React from 'react';
import { Card, CardTitle, CardText, CardSubtitle, CardBody} from 'reactstrap';
import {ContentComponent} from '../components';


export const NewsComponent = (props) => {
    return(<ContentComponent><div className="row flex-column flex-lg-row px-0">
                {props.articles.map((article, index) => {
                return (
                    <div key={index} className="col-12 col-lg-4 p-1">
                        <Card className="shadow-sm rounded-0">
                            <CardBody>
                                <CardTitle>{article.title}</CardTitle>
                                <CardSubtitle>{new Date(article.pub_date).toLocaleString()}</CardSubtitle>
                                <CardText>{article.text}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                        )
            })}
            </div>
           </ContentComponent>);
};