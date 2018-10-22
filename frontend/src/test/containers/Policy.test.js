import React from 'react';
import Policy from '../../containers/Policy';
import {shallow} from 'enzyme';
import {check_policy, set_policy} from '../../actions/policy';
import {eventData} from '../utils';


jest.mock('../../actions/policy');

describe('Policy Container', () => {
    check_policy.mockReturnValue(false);
    set_policy.mockReturnValue(true);
    const container = shallow(<Policy />);
    
    it('Should make api call for check_policy', () => {
        container.update();
        expect(check_policy).toHaveBeenCalled();
    });
    
    it('Should make api call for set_policy', () => {
        container.instance().accept_policy(eventData);
        container.update();
        expect(set_policy).toHaveBeenCalled();
    });
    
});
