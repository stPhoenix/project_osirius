
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {MywordsComponent} from '../../components';


describe('MywordsComponent', () => {
    it('should render correctly', () => {
        const location = {pathname: "/mywords"};
        const output = shallow(<MywordsComponent location={location} />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});