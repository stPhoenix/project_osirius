
import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {ContentComponent} from '../../components';


describe('ContentComponent', () => {
    it('should render correctly', () => {
        const componentProps = {
                                children: [],
};
        const output = shallow(<ContentComponent {...componentProps} />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});