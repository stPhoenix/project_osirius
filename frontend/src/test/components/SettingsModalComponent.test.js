
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {SettingsModalComponent} from '../../components';


describe('SettingsModalComponent', () => {
    it('should render correctly', () => {
        const componentProps = {
                                handleChange: jest.fn(),
                                toggle_modal: jest.fn(),
                                change_password: jest.fn(),
                                password1: "",
                                password2: "",
                                password: "",
                                modal: true,
                                };
        const output = shallow(<SettingsModalComponent {...componentProps} />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});