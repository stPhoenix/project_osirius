import React from 'react';


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
			<button className="custom-btn theme-primary align-self-center px-3" onClick={props.changePassword}>Change password</button>
            <div className="m-2 form-group">
                <label htmlFor="firstname">Change your name</label>
                <input className="custom-form-control" type="text" name="first_name" id="firstname" placeholder="Your name" onChange={props.handleChange} value={props.first_name} />
            </div>
            <div className="m-2 form-group">
                <label htmlFor="home_language">Learn languages</label>
                <select multiple className="custom-form-control" id="home_language" name="home_language">
                    {props.learn_langs.map((lang) => (<option key={lang.name+"2"}>{lang.name}</option>))}
                </select>
            </div>
            <div className="m-2 form-group">
                <label htmlFor="current_language">Add learn language</label>
                <select className="custom-form-control" id="current_language" onChange={props.handleChange} name="current_language">
                     {props.langs.map((lang) => (<option key={lang.name+"1"}>{lang.name}</option>))}
                </select>
            </div>
			<button className="custom-btn theme-primary align-self-center px-3" onClick={props.click}>Save</button>
		</form>
	);
};