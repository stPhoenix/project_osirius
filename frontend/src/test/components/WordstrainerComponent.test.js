
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {WordstrainerComponent} from '../../components';


describe('WordstrainerComponent', () => {
    it('should render correctly', () => {
        const location = {pathname: "/wordstrainer"};
        const output = shallow(<WordstrainerComponent location={location} />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});