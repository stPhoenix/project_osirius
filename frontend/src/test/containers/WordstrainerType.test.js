import React from 'react';
import WordstrainerType from '../../containers/WordstrainerType';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import {play_typing, result_play_typing} from '../../api';
import {api_call, classProps, play, eventData} from '../utils';


jest.mock('../../api');

describe('WordstrainerType Container', () => {
    const mockStore = configureStore();
    let store =  mockStore(classProps);
    play_typing.mockReturnValue(api_call(play));
    result_play_typing.mockReturnValue(api_call("Ok"));
    const container = shallow(<WordstrainerType store={store} reverse={false} />).dive();
    
    it('Should make api call for play typing', () => {
        container.update();
        expect(play_typing).toHaveBeenCalled();
        expect(container.state().word).toEqual(play.answer);
    });
    
    it('Should check answer with word and return true for right answer', () =>{
        expect(container.instance().check_answer("Thank you", "Thank you")).toEqual(true);
    });
    
});
