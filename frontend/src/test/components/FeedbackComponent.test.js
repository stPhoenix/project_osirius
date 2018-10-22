import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {FeedbackComponent} from '../../components';


describe('FeedbackComponent', () => {
    it('should render correctly', () => {
        const componentProps = {
            p_name: "s",
            email: "s",
            p_text: "s",
            onChange: jest.fn(),
            click: jest.fn(),
        }
        const output = shallow(<FeedbackComponent {...componentProps} />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});