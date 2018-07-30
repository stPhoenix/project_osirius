import React from 'react';
import AddwordsPresets from '../../containers/AddwordsPresets';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import {add_global_word, get_cats, get_words_by_cat} from '../../api/0';

jest.mock('../../api/0');

const api_call = (data) => {
    return new Promise((resolve, reject) => (resolve({result: true, data})));
};

describe('AddwordsPresets Container', () => {
    const classProps = {
                        auth: {token: "xxx", isAuthenticated: true},
                        };
    const mockStore = configureStore();
    let store =  mockStore(classProps);
    const cats = [{name: "Default", pk: "1"}];
    get_cats.mockReturnValue(api_call(cats));
    const words = [{name: "ありがとう",
                    translation: "Thank you",
                    pronunciation: "Arigato",
                    category_set: [{name: "Default", pk: "1"}],
                    pk: "1"}];
    get_words_by_cat.mockReturnValue(api_call(words));
    add_global_word.mockReturnValue(api_call("OK"));
    const eventData = {preventDefault: jest.fn, target: {name:"1", checked:true, value: "1"}};
    const container = shallow(<AddwordsPresets store={store} />).dive();
    
    it('Should get categories and words by cats', () => {
        container.update();
        expect(container.state().cats).toEqual(cats);
        expect(container.state().words).toEqual(words);
    });
    
    it('Should load new words when changing cat', () => {
        eventData.target.value = "Default";
        container.instance().handleChange(eventData);
        container.update();
        console.log(container.state());
        expect(container.state().words).toEqual(words);
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
        container.instance().add_global(eventData);
        container.update();
        expect(add_global_word).toHaveBeenCalled();
    });
});
