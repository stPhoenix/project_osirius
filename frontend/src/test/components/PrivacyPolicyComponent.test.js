import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {PrivacyPolicyComponent} from '../../components';


describe('PrivacyPolicyComponent', () => {
    it('should render correctly', () => {
        const output = shallow(<PrivacyPolicyComponent />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});