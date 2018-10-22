import React from 'react';
import { Card, CardTitle, CardText, CardSubtitle, CardBody, CardColumns} from 'reactstrap';
import PropTypes from 'prop-types';

const componentProps = {
    articles: PropTypes.array,
};

export const NewsComponent = (props) => {
    return(
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
);
};

NewsComponent.propTypes = componentProps;