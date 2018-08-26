import React from 'react';
import Settings from '../../containers/Settings';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import {update_user, get_langs, change_password, delete_user} from '../../api';
import {api_call, classProps, eventData, langs} from '../utils';


jest.mock('../../api');

describe('Settings Container', () => {
    const mockStore = configureStore();
    let store =  mockStore(classProps);
    update_user.mockReturnValue(api_call("Ok"));
    delete_user.mockReturnValue(api_call("Ok"));
    change_password.mockReturnValue(api_call("Ok"));
    get_langs.mockReturnValue(api_call(langs));
    const container = shallow(<Settings store={store} />).dive();
    
    it('Should make api call for get langs and setState', () => {
        container.update();
        expect(get_langs).toHaveBeenCalled();
        expect(container.state().langs).toEqual(langs);
    });
    
    it('Should handle change for fields', () => {
        eventData.target.name = "username";
        eventData.target.value = "test username";
        container.instance().handleChange(eventData);
        container.update();
        expect(container.state().username).toEqual("test username");
    });
    
    it('Should make api call for update user', () => {
        container.instance().save(eventData);
        container.update();
        expect(update_user).toHaveBeenCalled();
    });
    
    it('Should make api call for delete user', () => {
        container.instance().delete_user(eventData);
        container.update();
        expect(delete_user).toHaveBeenCalled();
    });
    
    it('Should make api call for delete user if save called with terms_check false', () => {
        container.setState({terms_check: false});
        container.update();
        container.instance().save(eventData);
        container.update();
        expect(delete_user).toHaveBeenCalled();
    });
    
    it('Should make api call for change password', () => {
        container.instance().change_password(eventData);
        container.update();
        expect(change_password).toHaveBeenCalled();
    });
    
    it('Should delete language from language set', () => {
        eventData.target.name = "English";
        container.instance().delete_language(eventData);
        container.update();
        expect(container.state().language_set).toEqual([{name: "Japanese", slug: "ja"}]);
    });
    
    it('Should set active language to current language field', () => {
        eventData.target.name = "Turkish";
        container.instance().set_active(eventData);
        container.update();
        expect(container.state().current_language).toEqual("Turkish");
    });
    
    it('Should add language to language set', () => {
        container.setState({temp_language: "Japanese"});
        container.instance().add_learn_language(eventData);
        container.update();
        expect(container.state().language_set).toEqual([{name: "Japanese", slug: "ja"}, {name: "Japanese", slug: "ja"}]);
    });
    
    it('Should toggle modal boolen', () => {
        container.setState({modal: false});
        container.instance().toggle_modal(eventData);
        container.update();
        expect(container.state().modal).toEqual(true);
    });
});
