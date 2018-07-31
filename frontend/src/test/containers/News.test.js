import React from 'react';
import News from '../../containers/News';
import {shallow} from 'enzyme';
import {get_news} from '../../api';
import {api_call, classProps} from '../utils';


jest.mock('../../api');

describe('News Container', () => {
    const news = [{title:"test title", text:"test text"}];
    get_news.mockReturnValue(api_call(news));
    const container = shallow(<News />);
    
    it('Should make api call for get news and setState', () => {
        container.update();
        expect(get_news).toHaveBeenCalled();
        expect(container.state().articles).toEqual(news);
    });
});
