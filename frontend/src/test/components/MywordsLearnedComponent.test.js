import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {MywordsLearnedComponent} from '../../components';


describe('MywordsLearnedComponent', () => {
    it('should render correctly', () => {
        const componentProps = {
                                handleCheck: jest.fn(),
                                learn_selected: jest.fn(),
                                learn_all: jest.fn(),
                                };
        const output = shallow(<MywordsLearnedComponent {...componentProps} />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});