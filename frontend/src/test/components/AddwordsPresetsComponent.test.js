import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {AddwordsPresetsComponent} from '../../components';


describe('AddwordsPresetsComponent', () => {
    it('should render correctly', () => {
        const componentProps = {
                                cats: [],
                                handleChange: jest.fn(),
                                add_selected: jest.fn(),
                                add_all: jest.fn(),
                                words: [],
                                handleCheck: jest.fn(),
};
        const output = shallow(<AddwordsPresetsComponent {...componentProps} />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});