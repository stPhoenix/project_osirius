import React from 'react';
import './AppComponent.css';


export const SignUpComponent = (props, {langs=["English", "Japanese", "Korean"]}) => {
    return (
        <form className="col-10 d-flex flex-column h-100" >
            <div className="m-2 form-group">
                <label htmlFor="username">Username</label>
                <input className="custom-form-control" type="text" name="username" id="username" placeholder="Username" />
            </div>
            <div className="m-2 form-group">
                <label htmlFor="password1">Password</label>
                <input className="custom-form-control" type="password" name="password1" id="password1" placeholder="Password" />
            </div>
            <div className="m-2 form-group">
                <label htmlFor="password2">Repeat password</label>
                <input className="custom-form-control" type="password" name="password2" id="password2" placeholder="Password" />
            </div>
            <div className="m-2 form-group">
                <label htmlFor="email">Email</label>
                <input className="custom-form-control" type="text" name="email" id="email" placeholder="Email" />
            </div>
            <div className="m-2 form-group">
                <label htmlFor="firstname">Your name</label>
                <input className="custom-form-control" type="text" name="first_name" id="firstname" placeholder="Your name" />
            </div>
            <div className="m-2 form-group">
                <label htmlFor="home_language">Your language</label>
                <select className="custom-form-control" id="home_language">
                    {langs.map((lang) => (<option key={lang+"2"}>{lang}</option>))}
                </select>
            </div>
            <div className="m-2 form-group">
                <label htmlFor="curent_language">Learn language</label>
                <select className="custom-form-control" id="current_language">
                     {langs.map((lang) => (<option key={lang+"1"}>{lang}</option>))}
                </select>
            </div>
			<button className="custom-btn theme-primary align-self-center" onClick={props.click}>SignUp</button>
		</form>
    );
};