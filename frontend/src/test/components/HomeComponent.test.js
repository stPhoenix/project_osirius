import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {HomeComponent} from '../../components';


describe('HomeComponent', () => {
    it('should render correctly', () => {
        const output = shallow(<HomeComponent />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});