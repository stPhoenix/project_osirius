import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {AboutComponent} from '../../components';


describe('AboutComponent', () => {
    it('should render correctly', () => {
        const output = shallow(<AboutComponent />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});