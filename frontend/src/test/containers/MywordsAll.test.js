import React from 'react';
import MywordsAll from '../../containers/MywordsAll';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import {get_user_words, delete_word as api_delete_word} from '../../api';
import {api_call, classProps, words, eventData} from '../utils';


jest.mock('../../api');

describe('MywordsAll Container', () => {
    const mockStore = configureStore();
    let store =  mockStore(classProps);
    api_delete_word.mockReturnValue(api_call("Ok"));
    get_user_words.mockReturnValue(api_call(words));
    const container = shallow(<MywordsAll store={store} />).dive();
    
    it('Should make api call for get user words', () => {
        container.update();
        expect(get_user_words).toHaveBeenCalled();
        expect(container.state().words).toEqual(words.results);
    });
        
    it('Should handle check for selected words', () => {
        api_delete_word.mockClear();
        container.instance().handleCheck(eventData);
        container.update();
        expect(container.state().selected).toEqual(["1"]);
    });
    
    it('Should call for delete all and make api call for delete word', () => {
        api_delete_word.mockClear();
        container.instance().delete_all(eventData);
        container.update();
        expect(api_delete_word).toHaveBeenCalled();
    });
    
    it('Should call for delete selected and api call for delete word', () => {
        api_delete_word.mockClear();
        container.instance().delete_selected(eventData);
        container.update();
        expect(api_delete_word).toHaveBeenCalled();
    });
});
