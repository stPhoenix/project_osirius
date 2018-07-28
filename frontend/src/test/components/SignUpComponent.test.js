
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {SignUpComponent} from '../../components';


describe('SignUpComponent', () => {
    it('should render correctly', () => {
        const componentProps = {
                                handleChange: jest.fn(),
                                username: "",
                                email: "",
                                first_name: "",
                                langs: [],
                                click: jest.fn(),
                                password1: "",
                                password2: "",
                                };
        const output = shallow(<SignUpComponent {...componentProps} />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});