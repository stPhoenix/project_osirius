import React from 'react';
import './AppComponent.css';
import { UncontrolledTooltip } from 'reactstrap';
import {SettingsModalComponent, ContentComponent} from '../components';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const componentProps = {
    handleChange: PropTypes.func,
    username: PropTypes.string,
    email: PropTypes.string,
    toggle_modal: PropTypes.func,
    first_name: PropTypes.string,
    language_set: PropTypes.array,
    current_language: PropTypes.string,
    set_active: PropTypes.func,
    delete_language: PropTypes.func,
    langs: PropTypes.array,
    add_learn_language: PropTypes.func,
    click: PropTypes.func,
    change_password: PropTypes.func,
    password1: PropTypes.string,
    password2: PropTypes.string,
    password: PropTypes.string,
    modal: PropTypes.bool,
    home_language: PropTypes.string
};

export const SettingsComponent = (props) => {
	return	(
        <ContentComponent>
	        <form className="col-12 col-md-8 col-lg-6 d-flex flex-column h-100 mb-4" >
            <div className="m-2 form-group">
                <label htmlFor="username">Change username</label>
                <input className="custom-form-control" type="text" name="username" id="username" placeholder="Username" onChange={props.handleChange} value={props.username} />
            </div>
            <div className="m-2 form-group">
                <label htmlFor="email">Change email</label>
                <input className="custom-form-control" type="text" name="email" id="email" placeholder="Email" onChange={props.handleChange} value={props.email} />
            </div>
			<button className="custom-btn theme-primary align-self-center px-3" onClick={props.toggle_modal}>Change password</button>
            <div className="m-2 form-group">
                <label htmlFor="firstname">Change your name</label>
                <input className="custom-form-control" type="text" name="first_name" id="firstname" placeholder="Your name" onChange={props.handleChange} value={props.first_name} />
            </div>
            <div className="m-2 form-group">
                <label htmlFor="home_language">Your language</label>
                <select className="custom-form-control" id="home_language" onChange={props.handleChange} name="home_language">
                    <option key={props.home_language+"21"}>{props.home_language}</option>
                    {props.langs.map((lang) => (<option key={lang.name+"2"}>{lang.name}</option>))}
                </select>
            </div>
            <div className="m-2 form-group">
                <label htmlFor="language_set">Learn languages</label>
                <div className="list-group" id="language_set">
                    {props.language_set.map((lang) => (<div key={lang.name+"4"}><button type="button" className="custom-form-control active" id={lang.name+"2"} key={lang.name+"2"}>{lang.name}                                           </button>
                                                            <UncontrolledTooltip key={lang.name+"3"} placement="bottom" target={lang.name+"2"}>
																{(lang.name !== props.current_language) ? <div> <button name={lang.name} className="btn btn-link" onClick={props.set_active}>Set active</button><button name={lang.name} className="btn btn-link" onClick={props.delete_language}>Delete</button></div> : "Active"
																}
                                                            </UncontrolledTooltip>
                                                       </div>))}
                </div>
            </div>
            <div className="mx-2 mt-2 mb-1 form-group">
                <label htmlFor="learn_language">Add learn language</label>
                <select className="custom-form-control" id="learn_language" onChange={props.handleChange} name="temp_language">
                     {props.langs.map((lang) => (<option key={lang.name+"1"}>{lang.name}</option>))}
                </select>
            </div>
			<button className="custom-btn theme-primary px-3 mb-2 mr-2 align-self-end" onClick={props.add_learn_language}>Add</button>
            <div className="m-2 form-group">
                <label className="m-checkbox-container d-flex align-items-center">
                    <input name="terms_check" onChange={props.handleCheck} type="checkbox" checked={props.terms_check} />
                    <span className="m-checkbox"></span>
			        <h6 className="ml-4 mb-0 pl-1">I agree with <Link to="/privacy_policy">Privacy policy</Link></h6>
                </label>
            </div>
            <button className="btn-danger custom-btn align-self-start px-3 mb-2 ml-2" onClick={props.delete_user}>Delete user</button>
			<button className="custom-btn theme-primary align-self-center px-3" onClick={props.click}>Save</button>
            <SettingsModalComponent change_password={props.change_password}
                                    toggle_modal={props.toggle_modal}
                                    password1={props.password1}
                                    password2={props.password2}
                                    password={props.password}
                                    modal={props.modal}
									handleChange={props.handleChange}/>
		</form>
    </ContentComponent>
	);
};

SettingsComponent.propTypes = componentProps;