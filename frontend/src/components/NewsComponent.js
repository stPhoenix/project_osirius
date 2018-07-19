import React from 'react';
import { Card, CardTitle, CardText, CardSubtitle, CardBody, CardColumns} from 'reactstrap';
import {ContentComponent} from '../components';
import PropTypes from 'prop-types';

const componentProps = {
    articles: PropTypes.array,
};

export const NewsComponent = (props) => {
    return(<ContentComponent><div className="row flex-column flex-lg-row px-0">
            <CardColumns>
                {props.articles.map((article, index) => {
                return (
                        <Card key={index} className="shadow-sm rounded-0">
                            <CardBody>
                                <CardTitle>{article.title}</CardTitle>
                                <CardSubtitle>{new Date(article.pub_date).toLocaleString()}</CardSubtitle>
                                <CardText>{article.text}</CardText>
                            </CardBody>
                        </Card>
                        )
            })}
                </CardColumns>
            </div>
           </ContentComponent>);
};

NewsComponent.propTypes = componentProps;