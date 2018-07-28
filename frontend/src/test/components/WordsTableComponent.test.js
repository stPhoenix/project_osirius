import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {WordsTableComponent} from '../../components';


describe('WordsTableComponent', () => {
    it('should render correctly', () => {
        const componentProps = {
                                words: [],
                                handleCheck: jest.fn(),
                                };
        const output = shallow(<WordsTableComponent {...componentProps} />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});