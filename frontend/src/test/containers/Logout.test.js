import React from 'react';
import Logout from '../../containers/Logout';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import {logout} from '../../api';
import {api_call, classProps} from '../utils';


jest.mock('../../api');

describe('Logout Container', () => {
    const mockStore = configureStore();
    let store =  mockStore(classProps);
    logout.mockReturnValue(api_call("Ok"));
    const container = shallow(<Logout store={store} />).dive();
    
    it('Should make api call for logout', () => {
        container.update();
        expect(logout).toHaveBeenCalled();
    });
});
