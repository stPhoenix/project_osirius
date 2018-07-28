
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {MywordsAllComponent} from '../../components';


describe('MyWordsAllComponent', () => {
    it('should render correctly', () => {
        const componentProps = {
                                handleCheck: jest.fn(),
                                delete_selected: jest.fn(),
                                delete_all: jest.fn(),
                                words: new Array(),
                                };
        const output = shallow(<MywordsAllComponent {...componentProps} />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});