import React from 'react';
import './AppComponent.css';
import PropTypes from 'prop-types';

const componentProps = {
    handleChange: PropTypes.func,
    username: PropTypes.string,
    email: PropTypes.string,
    first_name: PropTypes.string,
    langs: PropTypes.array,
    click: PropTypes.func,
    password1: PropTypes.string,
    password2: PropTypes.string,
};

export const SignUpComponent = (props) => {
    return (
        <form className="col-10 d-flex flex-column h-100 mb-4" >
            <div className="m-2 form-group">
                <label htmlFor="username">Username</label>
                <input className="custom-form-control" type="text" name="username" id="username" placeholder="Username" onChange={props.handleChange} value={props.username} />
            </div>
            <div className="m-2 form-group">
                <label htmlFor="password1">Password</label>
                <input className="custom-form-control" type="password" name="password1" id="password1" placeholder="Password" onChange={props.handleChange} value={props.password1} />
            </div>
            <div className="m-2 form-group">
                <label htmlFor="password2">Repeat password</label>
                <input className="custom-form-control" type="password" name="password2" id="password2" placeholder="Password" onChange={props.handleChange} value={props.password2} />
            </div>
            <div className="m-2 form-group">
                <label htmlFor="email">Email</label>
                <input className="custom-form-control" type="text" name="email" id="email" placeholder="Email" onChange={props.handleChange} value={props.email} />
            </div>
            <div className="m-2 form-group">
                <label htmlFor="firstname">Your name</label>
                <input className="custom-form-control" type="text" name="first_name" id="firstname" placeholder="Your name" onChange={props.handleChange} value={props.first_name} />
            </div>
            <div className="m-2 form-group">
                <label htmlFor="home_language">Your language</label>
                <select className="custom-form-control" id="home_language" onChange={props.handleChange} name="home_language">
                    {props.langs.map((lang) => (<option key={lang.name+"2"}>{lang.name}</option>))}
                </select>
            </div>
            <div className="m-2 form-group">
                <label htmlFor="current_language">Learn language</label>
                <select className="custom-form-control" id="current_language" onChange={props.handleChange} name="current_language">
                     {props.langs.map((lang) => (<option key={lang.name+"1"}>{lang.name}</option>))}
                </select>
            </div>
			<button className="custom-btn theme-primary align-self-center px-3" onClick={props.click}>SignUp</button>
		</form>
    );
};

SignUpComponent.propTypes = componentProps;