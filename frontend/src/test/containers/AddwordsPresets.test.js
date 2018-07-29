import React from 'react';
import AddwordsPresets from '../../containers/AddwordsPresets';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import {add_global_word, get_cats, get_words_by_cat} from '../../api/0';

jest.mock('../../api/0');

describe('AddwordsPresets Container', () => {
    const classProps = {
                        auth: {token: "xxx", isAuthenticated: true},
                        };
    const mockStore = configureStore();
    let store =  mockStore(classProps);
    get_cats.mockResolvedValue({result: true, data: [{name: "Default", pk: "1"}]});
    const words = [{name: "ありがとう",
                    translation: "Thank you",
                    pronunciation: "Arigato",
                    category_set: [{name: "Default", pk: "1"}],
                    pk: "1"}];
    get_words_by_cat.mockResolvedValue({result: true, data: words});
    
    const container = shallow(<AddwordsPresets store={store} />);
    
    it('Should get categories and words by cats', () => {
        container.instance();
        container.update();
        console.log(container.instance().handleChange);
        expect(container.state().words).toEqual(words);
    });
});
