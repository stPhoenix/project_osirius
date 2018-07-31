import React from 'react';
import NavBar from '../../containers/NavBar';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import {check_token} from '../../actions/auth';
import {classProps} from '../utils';


jest.mock('../../actions/auth');

describe('NavBar Container', () => {
    const mockStore = configureStore();
    let store =  mockStore(classProps);
    check_token.mockReturnValue("Ok");
    const container = shallow(<NavBar store={store} />).dive();
    
    it('Should make call for check token', () => {
        container.update();
        expect(check_token).toHaveBeenCalled();
    });
});
