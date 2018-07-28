import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {AppComponent} from '../../components';


describe('AppComponent', () => {
    it('should render correctly', () => {
        const output = shallow(<AppComponent />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});