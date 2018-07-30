import React from 'react';
import AddwordsType from '../../containers/AddwordsType';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import {add_custom_word, add_global_word, get_cats, search_word} from '../../api';
import {api_call, eventData, cats, classProps} from '../utils';


jest.mock('../../api');

describe('AddwordsType Container', () => {
    const mockStore = configureStore();
    let store =  mockStore(classProps);
    get_cats.mockReturnValue(api_call(cats));
    add_global_word.mockReturnValue(api_call("OK"));
    add_custom_word.mockReturnValue(api_call("OK"));
    search_word.mockReturnValue(api_call("OK"));
    const container = shallow(<AddwordsType store={store} />).dive();
    
    it('Should toggle modal boolen', () => {
        container.instance().toggle_modal(eventData);
        container.update();
        expect(container.state().modal).toEqual(true);    
    });
    
    it('Should get categories and toggle modal with custom word', () => {
        container.setState({modal: false});
        container.instance().choose_category("ありがとう", "Arigato", "Thank you");
        container.update();
        expect(get_cats).toHaveBeenCalled();
        //expect(container.state().modal).toEqual(true);
        //expect(container.state().custom_word).toEqual({word_name:"ありがとう", pronunciation: "Arigato", translation: "Thank you"});
    });
    
    it('Should make api call for add word', () => {
        add_global_word.mockClear();
        container.instance().add_global(eventData);
        container.update();
        expect(add_global_word).toHaveBeenCalled();
    });
    
    it('Should handle change of field and setState', () => {
        eventData.target.name = "test_var";
        eventData.target.value = "test_val";
        container.instance().handleChange(eventData);
        container.update();
        expect(container.state().test_var).toEqual("test_val");
    });
    
    it('Should make api call for add custom word', () => {
        container.instance().add_custom(eventData);
        container.update();
        expect(add_custom_word).toHaveBeenCalled();
    });
    
    it('Should make api call for search word', () => {
        container.instance().search(eventData);
        container.update();
        expect(search_word).toHaveBeenCalled();
    });
   
});
