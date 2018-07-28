import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {AddwordsComponent} from '../../components';


describe('AddwordsComponent', () => {
    it('should render correctly', () => {
        const location = {pathname: "/addwords"}
        const output = shallow(<AddwordsComponent location={location} />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});