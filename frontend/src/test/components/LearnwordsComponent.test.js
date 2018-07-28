
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {LearnwordsComponent} from '../../components';


describe('LearnwordsComponent', () => {
    it('should render correctly', () => {
        const props = {word: new Object()};
        const output = shallow(<LearnwordsComponent {...props} />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});