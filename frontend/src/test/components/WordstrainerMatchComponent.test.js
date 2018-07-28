import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {WordstrainerMatchComponent} from '../../components';


describe('WordstrainerMatchComponent', () => {
    it('should render correctly', () => {
        const componentProps = {
                                words: [],
                                question: "",
                                proceed_answer: jest.fn(),
                                next_word: jest.fn(),
                                };
        const output = shallow(<WordstrainerMatchComponent {...componentProps} />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});