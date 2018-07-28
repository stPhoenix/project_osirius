
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {SettingsComponent} from '../../components';


describe('SettingsComponent', () => {
    it('should render correctly', () => {
        const componentProps = {
                                handleChange: jest.fn(),
                                username: "",
                                email: "",
                                toggle_modal: jest.fn(),
                                first_name: "",
                                language_set: [],
                                current_language: "",
                                set_active: jest.fn(),
                                delete_language: jest.fn(),
                                langs: [],
                                add_learn_language: jest.fn(),
                                click: jest.fn(),
                                change_password: jest.fn(),
                                password1: "",
                                password2: "",
                                password: "",
                                modal: false,
                                };
        const output = shallow(<SettingsComponent {...componentProps} />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});