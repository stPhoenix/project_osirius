
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {AddwordsTypeModalComponent} from '../../components';


describe('AddwordsTypeModalComponent', () => {
    it('should render correctly', () => {
        const componentProps = {
                                handleChange: jest.fn(),
                                add_custom: jest.fn(),
                                cats: [],
                                modal: true,
                                toggle_modal: jest.fn(),
                                };
        const output = shallow(<AddwordsTypeModalComponent {...componentProps} />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});