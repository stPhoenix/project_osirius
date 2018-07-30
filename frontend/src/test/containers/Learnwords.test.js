import React from 'react';
import Learnwords from '../../containers/Learnwords';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import {get_learn_word, set_learn_word} from '../../api';
import {api_call, eventData, classProps} from '../utils';


jest.mock('../../api');

describe('Learnwords Container', () => {
    const mockStore = configureStore();
    let store =  mockStore(classProps);
    
    get_learn_word.mockReturnValue(api_call("Ok"));
    set_learn_word.mockReturnValue(api_call("Ok"));
    
    const container = shallow(<Learnwords store={store} />).dive();
    
    it('Should make api call for get learn word', () => {
        container.update();
        expect(get_learn_word).toHaveBeenCalled();
    });
    
    it('Should make api call for set learn word', () => {
        container.instance().learned(eventData);
        container.update();
        expect(set_learn_word).toHaveBeenCalled();
    });
   
    it('Should make call for get word function and api call for set learn word', () => {
        get_learn_word.mockClear();
        container.instance().not_learned(eventData);
        container.update();
        expect(get_learn_word).toHaveBeenCalled();
    });
});
