
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {NavBarComponent} from '../../components';


describe('NavBarComponent', () => {
    it('should render correctly', () => {
        const componentProps = {
                                isAuthenticated: true,
                                };
        const output = shallow(<NavBarComponent {...componentProps} />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});