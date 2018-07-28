import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {AddwordsTypeComponent} from '../../components';


describe('AddwordsTypeComponent', () => {
    it('should render correctly', () => {
        const componentProps = {
                                global_word_search: false,
                                words: [],
                                add_global: jest.fn(),
                                google_translate_search: false,
                                choose_category: jest.fn(),
                                search_word: '',
                                handleChange: jest.fn(),
                                add_custom: jest.fn(),
                                cats: [],
                                modal: false,
                                toggle_modal: jest.fn(),
                                };
        const output = shallow(<AddwordsTypeComponent {...componentProps} />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});