import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {GetStartedComponent} from '../../components';


describe('GetStartedComponent', () => {
    it('should render correctly', () => {
        const output = shallow(<GetStartedComponent />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});