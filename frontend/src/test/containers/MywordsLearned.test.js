import React from 'react';
import MywordsLearned from '../../containers/MywordsLearned';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import {get_learned_words, learn_again_word} from '../../api';
import {api_call, classProps, words, eventData} from '../utils';


jest.mock('../../api');

describe('MywordsLearned Container', () => {
    const mockStore = configureStore();
    let store =  mockStore(classProps);
    learn_again_word.mockReturnValue(api_call("Ok"));
    get_learned_words.mockReturnValue(api_call(words));
    const container = shallow(<MywordsLearned store={store} />).dive();
    
    it('Should make api call for get learned words', () => {
        container.update();
        expect(get_learned_words).toHaveBeenCalled();
        expect(container.state().words).toEqual(words.results);
    });
    
    it('Should handle check for selected words', () => {
        container.instance().handleCheck(eventData);
        container.update();
        expect(container.state().selected).toEqual(["1"]);
    });
    
    it('Should call for learn word and make api call for learn word again', () => {
        container.instance().learn_word("1");
        container.update();
        expect(learn_again_word).toHaveBeenCalled();
    });
    
    it('Should call for learn all and make api call for learn word again', () => {
        learn_again_word.mockClear();
        container.instance().learn_all(eventData);
        container.update();
        expect(learn_again_word).toHaveBeenCalled();
    });
    
    it('Should call for learn selected and api call for learn words again', () => {
        learn_again_word.mockClear();
        container.instance().learn_selected(eventData);
        container.update();
        expect(learn_again_word).toHaveBeenCalled();
    });
});
