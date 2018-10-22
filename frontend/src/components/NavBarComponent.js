import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,} from 'reactstrap';
import {NavItemComponent} from './NavItemComponent';
import logo from '../assets/logo.png';
import github from '../assets/github.png';
import telegram from '../assets/telegram.png';
import './AppComponent.css';
import PropTypes from 'prop-types';


const componentProps = {
    isAuthenticated: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
};

export const NavBarComponent = ({isAuthenticated, toggle, isOpen}) => {
	return (
				<Navbar dark expand="lg" className="px-0 font-exo-2bold w-100">
                    <NavbarBrand className="mr-auto" href="#">
                        <img src={logo} width="120rem" height="auto" alt="Linguint logo" />
                    </NavbarBrand>
                    <NavbarToggler className="btn btn-link border-0" onClick={toggle} />
                    <Collapse className="w-100" isOpen={isOpen} navbar>
                        <Nav className="w-100 justify-content-center" navbar>
                            <NavItemComponent visible={true} text="Home" link="/" />
                            <NavItemComponent visible={!isAuthenticated} text="Log in" link="/login" />
                            <NavItemComponent visible={isAuthenticated} text="Log out" link="/logout" />
                            <NavItemComponent visible={!isAuthenticated} text="Sign Up" link="/signup" />
                            <NavItemComponent visible={isAuthenticated} text="Settings" link="/settings" />
                            <NavItemComponent visible={true} text="Get started" link="/getstarted" />
                        </Nav>
                        <div className="d-none d-lg-flex d-lg-flex-row align-items-center ml-auto">
                            <a target="blank" href="https://github.com/stPhoenix/project_osirius"><img src={github} width="40rem" height="auto" alt="Github link" /></a>
                            <a href="telegram:@LinguintBot" className="link-unstyled"><img src={telegram} width="31rem" height="auto" alt="Telegram bot link" /></a>
                            <a href="telegram:@LinguintBot" className="h5 mb-0 text-white link-unstyled">@LinguintBot</a>
                        </div>
                    </Collapse>
                </Navbar>
	);
}

NavBarComponent.propTypes = componentProps;