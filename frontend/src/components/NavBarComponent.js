import React from 'react';
import {Nav} from 'reactstrap';
import {NavItemComponent} from './NavItemComponent';
import usericon from '../assets/user.png';
import abouticon from '../assets/about.png';
import getstartedicon from '../assets/getstarted.png';
import learnwordsicon from '../assets/learnwords.png';
import mywordsicon from '../assets/mywords.png';
import newsicon from '../assets/news.png';
import settingsicon from '../assets/settings.png';
import wordstrainericon from '../assets/wordstrainer.png';
import addwordsicon from '../assets/addwords.png';
import './AppComponent.css';


const NavBarComponent = ({isAuthenticated}) => {
	return (
				<nav className="px-4 py-1 shadow-sm vh-100">
                	<Nav className="my-3" vertical>
						<NavItemComponent visible={!isAuthenticated} src={usericon} text="Sign Up" />
				        <NavItemComponent visible={!isAuthenticated} src={usericon} text="Log in" />
						<NavItemComponent visible={isAuthenticated} src={usericon} text="Sign out" />
						<NavItemComponent src={getstartedicon} text="Get started" />
						<NavItemComponent visible={isAuthenticated} src={settingsicon} text="Settings" />
					</Nav>
					<Nav className="my-5" vertical>
						<NavItemComponent visible={isAuthenticated} src={addwordsicon} text="Add words" />
						<NavItemComponent visible={isAuthenticated} src={learnwordsicon} text="Learn words" />
						<NavItemComponent visible={isAuthenticated} src={mywordsicon} text="My words" />
						<NavItemComponent visible={isAuthenticated} src={wordstrainericon} text="Words trainer" />
					</Nav>
					<Nav className="my-3" vertical>
						<NavItemComponent src={newsicon} text="News" />
						<NavItemComponent src={abouticon} text="About" />
					</Nav>
				</nav>
	);
}

export default NavBarComponent;