import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {LoginComponent} from '../../components';


describe('LoginComponent', () => {
    it('should render correctly', () => {
        const componentProps = {
                                onChange: jest.fn(),
                                click: jest.fn(),
                                };
        const output = shallow(<LoginComponent {...componentProps} />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});