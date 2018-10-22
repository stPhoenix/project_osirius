import React from 'react';
import {ContentComponent} from '../components';
import './AppComponent.css';
import PropTypes from 'prop-types';

const componentProps = {
    word: PropTypes.object,
};

export const LearnwordsComponent = (props) => {
    let data;
    if (Object.keys(props.word).length !== 0){
        data = (<div className="d-flex flex-column text-center">
                    <br /> {props.word.name}
                    <br /> [{props.word.pronunciation}]
                    <br /> {props.word.translation}
                    <div className="d-flex mt-3">
                        <button className="custom-btn theme-primary mx-5" name={props.word.id} onClick={props.learned}>Learned</button>
                        <button className="custom-btn theme-primary mx-5" name={props.word.id} onClick={props.not_learned}>Not learned</button>
                    </div>
                </div>);
    } 
    else{
        data = (<h4>No words to learn.</h4>);
    }
    return(
        <ContentComponent>
            <h2>Learn words</h2>
            {data}
        </ContentComponent>
    );
};

LearnwordsComponent.propTypes = componentProps;