import React from 'react';
import AddwordsPresets from '../../containers/AddwordsPresets';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import {add_global_word, get_cats, get_words_by_cat} from '../../api/0';
import {api_call, eventData, cats, words, classProps} from '../utils';


jest.mock('../../api/0');

describe('AddwordsPresets Container', () => {
    const mockStore = configureStore();
    let store =  mockStore(classProps);
    get_cats.mockReturnValue(api_call(cats));
    get_words_by_cat.mockReturnValue(api_call(words));
    add_global_word.mockReturnValue(api_call("OK"));
    const container = shallow(<AddwordsPresets store={store} />).dive();
    
    it('Should get categories and words by cats', () => {
        container.update();
        expect(container.state().cats).toEqual(cats);
        expect(container.state().words).toEqual(words);
    });
    
    it('Should load new words when changing cat', () => {
        get_words_by_cat.mockClear();
        eventData.target.value = "Default";
        container.instance().handleChange(eventData);
        container.update();
        expect(get_words_by_cat).toHaveBeenCalled();
    });
    
    it('Should add word to selected in state', () => {
        eventData.target.name = "1";
        container.instance().handleCheck(eventData);
        container.update();
        expect(container.state().selected).toHaveLength(1);
    });
    
    it('Should remove word from selected in state', () => {
        eventData.target.name = "1";
        eventData.target.checked = false;
        container.instance().handleCheck(eventData);
        container.update();
        expect(container.state().selected).toHaveLength(0);
    });
    
    it('Should make api call for add word', () => {
        add_global_word.mockClear();
        container.instance().add_global(eventData);
        container.update();
        expect(add_global_word).toHaveBeenCalled();
    });
    
    it('Should make api call for add word from add all function', () => {
        add_global_word.mockClear();
        container.instance().add_all(eventData);
        container.update();
        expect(add_global_word).toHaveBeenCalled();
    });
    
    it('Should make api call for add word from add selected function', () => {
        add_global_word.mockClear();
        container.setState({selected: ["1", "1", "1"]});
        container.instance().add_selected(eventData);
        container.update();
        expect(add_global_word).toHaveBeenCalledTimes(3);
    });
});
