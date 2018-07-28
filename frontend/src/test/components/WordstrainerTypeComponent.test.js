import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {WordstrainerTypeComponent} from '../../components';


describe('WordstrainerTypeComponent', () => {
    it('should render correctly', () => {
        const componentProps = {
                                word: {},
                                question: "",
                                right_answer: "",
                                answer: "",
                                handleChange: jest.fn(),
                                button_click: jest.fn(),
                                button_text: "",
                                };
        const output = shallow(<WordstrainerTypeComponent {...componentProps} />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});