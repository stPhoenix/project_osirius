import React from 'react';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

import {DataCollectionComponent} from '../../components';


describe('DataCollectionComponent', () => {
    it('should render correctly', () => {
        const output = shallow(<DataCollectionComponent />);
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});