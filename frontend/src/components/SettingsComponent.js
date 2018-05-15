import React from 'react';
import './AppComponent.css';
import { UncontrolledTooltip } from 'reactstrap';


export const SettingsComponent = (props) => {
	return	(
	        <form className="col-10 d-flex flex-column h-100 mb-4" >
            <div className="m-2 form-group">
                <label htmlFor="username">Change username</label>
                <input className="custom-form-control" type="text" name="username" id="username" placeholder="Username" onChange={props.handleChange} value={props.username} />
            </div>
            <div className="m-2 form-group">
                <label htmlFor="email">Change email</label>
                <input className="custom-form-control" type="text" name="email" id="email" placeholder="Email" onChange={props.handleChange} value={props.email} />
            </div>
			<button className="custom-btn theme-primary align-self-center px-3" onClick={props.change_password}>Change password</button>
            <div className="m-2 form-group">
                <label htmlFor="firstname">Change your name</label>
                <input className="custom-form-control" type="text" name="first_name" id="firstname" placeholder="Your name" onChange={props.handleChange} value={props.first_name} />
            </div>
            <div className="m-2 form-group">
                <label htmlFor="language_set">Learn languages</label>
                <div className="list-group" id="language_set">
                    {props.language_set.map((lang) => (<div key={lang.name+"4"}><button type="button" className="custom-form-control" id={lang.name+"2"} key={lang.name+"2"}>{lang.name}                                           </button>
                                                            <UncontrolledTooltip key={lang.name+"3"} placement="right" target={lang.name+"2"}>
                                                                    <button name={lang.name}>Set active</button><button name={lang.name}>Delete</button>
                                                            </UncontrolledTooltip>
                                                       </div>))}
                </div>
            </div>
            <div className="m-2 form-group">
                <label htmlFor="learn_language">Add learn language</label>
                <select className="custom-form-control" id="learn_language" onChange={props.handleChange} name="temp_language">
                     {props.langs.map((lang) => (<option key={lang.name+"1"}>{lang.name}</option>))}
                </select>
                <button className="custom-btn theme-primary align-self-center px-3" onClick={props.add_learn_language}>Add</button>
            </div>
			<button className="custom-btn theme-primary align-self-center px-3" onClick={props.click}>Save</button>
		</form>
	);
};