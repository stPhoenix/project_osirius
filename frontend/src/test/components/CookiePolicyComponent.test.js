import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {CookiePolicyComponent} from '../../components';


describe('CookiePolicyComponent', () => {
    it('should render correctly', () => {
        const output = shallow(<CookiePolicyComponent />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});