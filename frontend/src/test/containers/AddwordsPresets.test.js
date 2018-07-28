import React from 'react';
import AddwordsPresets from '../../containers/AddwordsPresets';
import {shallow} from 'enzyme';
import {connect} from 'react-redux';

jest.mock(connect);

describe('AddwordsPresets Container', () => {
    const classProps = {
                        dispatch: jest.fn(),
                        token: "xxx",
                        isAuthenticated: true,
                        };
    const container = shallow(<AddwordsPresets {...classProps} />);
    it('Should get categories', () => {
        container.props.componentDidMount();
        expect(dispatch).toHaveBeenCalled();
    });
});
