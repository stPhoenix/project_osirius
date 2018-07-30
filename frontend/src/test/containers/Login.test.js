import React from 'react';
import Login from '../../containers/Login';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import {login} from '../../api';
import {api_call, eventData, classProps} from '../utils';


jest.mock('../../api');

describe('Login Container', () => {
    const mockStore = configureStore();
    let store =  mockStore(classProps);
    login.mockReturnValue(api_call("Ok"));
    const container = shallow(<Login store={store} />).dive();
    
    it('Should make api call for login', () => {
        container.instance().login(eventData);
        container.update();
        expect(login).toHaveBeenCalled();
    });
    
    it('Should handle field change for setState', () => {
        eventData.target.name = "username";
        eventData.target.value = "test user";
        container.instance().onChange(eventData);
        container.update();
        expect(container.state().username).toEqual("test user");
    });
});
