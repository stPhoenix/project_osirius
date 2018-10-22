import React from 'react';
import Feedback from '../../containers/Feedback';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import {send_feedback} from '../../api';
import {api_call, eventData, classProps} from '../utils';


jest.mock('../../api');

describe('Feedback Container', () => {
    const mockStore = configureStore();
    let store =  mockStore(classProps);
    send_feedback.mockReturnValue(api_call("Ok"));
    const container = shallow(<Feedback store={store} />).dive();
    
    it('Should make api call for send_feedback', () => {
        container.instance().send_f(eventData);
        container.update();
        expect(send_feedback).toHaveBeenCalled();
    });
    
    it('Should handle field change for setState', () => {
        eventData.target.name = "p_name";
        eventData.target.value = "test user";
        container.instance().onChange(eventData);
        container.update();
        expect(container.state().p_name).toEqual("test user");
    });
});
