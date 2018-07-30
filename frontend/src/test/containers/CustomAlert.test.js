import React from 'react';
import CustomAlert from '../../containers/CustomAlert';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import {toggle_alert, delete_alert} from '../../actions/alert';


jest.mock('../../actions/alert');

describe('CustomAlert Container', () => {
    const classProps = {
                        alert: {visible: true},
                        };
    const mockStore = configureStore();
    let store =  mockStore(classProps);
    toggle_alert.mockReturnValue({type:"TEST"});
    delete_alert.mockReturnValue({type:"TEST", action: "TEST"});
    const container = shallow(<CustomAlert store={store} pk="1" />).dive();
    
    it('Should dispatch toggle alert', () => {
        container.instance().onDismiss();
        container.update();
        expect(toggle_alert).toHaveBeenCalled();    
    });
    
    it('Should dispatch toggle alert and delete alert', () => {
        //toggle_alert.mockClear();
        container.instance().onExited();
        container.update();
        expect(toggle_alert).toHaveBeenCalled();
        expect(delete_alert).toHaveBeenCalled();
    });
   
});
