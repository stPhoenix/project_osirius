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
			
			<button className="custom-btn theme-primary align-self-center px-3" onClick={props.click}>Save</button>
		</form>
	);
};