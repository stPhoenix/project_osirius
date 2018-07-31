import React from 'react';
import WordstrainerMatch from '../../containers/WordstrainerMatch';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import {play_matching, result_play_matching} from '../../api/0';
import {api_call, classProps, play, eventData} from '../utils';


jest.mock('../../api/0');

describe('WordstrainerMatch Container', () => {
    const mockStore = configureStore();
    let store =  mockStore(classProps);
    play_matching.mockReturnValue(api_call(play));
    result_play_matching.mockReturnValue(api_call("Ok"));
    const container = shallow(<WordstrainerMatch store={store} reverse={false} />).dive();
    
    it('Should make api call for play matching', () => {
        container.update();
        expect(play_matching).toHaveBeenCalled();
        expect(container.state().answer).toEqual(play.answer);
    });
    
    it('Should make api call for result play matching', () => {
        container.setState({answer: {id: 1}});
        container.instance().proceed_answer(eventData);
        container.update();
        expect(result_play_matching).toHaveBeenCalled();
    });
    
});
