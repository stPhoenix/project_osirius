
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {NewsComponent} from '../../components';


describe('NewsComponent', () => {
    it('should render correctly', () => {
        const componentProps = {
                                articles: [],
                                };
        const output = shallow(<NewsComponent {...componentProps} />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});