
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {CustomAlertComponent} from '../../components';


describe('CustomAlertComponent', () => {
    it('should render correctly', () => {
        const componentProps = {
                                color: "success",
                                visible: true,
                                toggle: jest.fn(),
                                onExited: jest.fn(),
                                text: "test",
                                };
        const output = shallow(<CustomAlertComponent {...componentProps} />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});