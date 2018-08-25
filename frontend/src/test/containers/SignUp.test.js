import React from 'react';
import SignUp from '../../containers/SignUp';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import {sign_up, get_langs, get_user} from '../../api';
import {api_call, classProps, eventData, langs} from '../utils';


jest.mock('../../api');

describe('Settings Container', () => {
    const mockStore = configureStore();
    let store =  mockStore(classProps);
    sign_up.mockReturnValue(api_call("Ok"));
    get_user.mockReturnValue(api_call(classProps.auth.user));
    get_langs.mockReturnValue(api_call(langs));
    const container = shallow(<SignUp store={store} />).dive();
    
    it('Should make api call for get langs and setState', () => {
        container.update();
        expect(get_langs).toHaveBeenCalled();
        expect(container.state().langs).toEqual(langs);
    });
    
    it('Should handle change for fields', () => {
        eventData.target.name = "username";
        eventData.target.value = "test username";
        container.instance().handleChange(eventData);
        container.update();
        expect(container.state().username).toEqual("test username");
    });
    
    it('Should make api call for sign up', () => {
        container.instance().setState({terms_check: true});
        container.instance().register(eventData);
        container.update();
        expect(sign_up).toHaveBeenCalled();
    });
});
