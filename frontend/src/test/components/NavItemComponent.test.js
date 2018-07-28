
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {NavItemComponent} from '../../components';


describe('NavItemComponent', () => {
    it('should render correctly', () => {
        const componentProps = {
                                src: "#",
                                link: "",
                                text: "",
                                visible: true,
                                };
        const output = shallow(<NavItemComponent {...componentProps} />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});