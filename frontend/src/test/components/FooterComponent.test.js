import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {FooterComponent} from '../../components';


describe('FooterComponent', () => {
    it('should render correctly', () => {
        const output = shallow(<FooterComponent />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});