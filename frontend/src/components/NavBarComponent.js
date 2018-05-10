import React from 'react';
import {Nav, NavItem} from 'reactstrap';
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


const NavBarComponent = ({isAuthenticated}) => {
	return (
				<nav className="px-4 py-1">
                	<Nav className="my-3" vertical>
						<NavItemComponent src={usericon} text="Sign Up" />
				        <NavItemComponent src={usericon} text="Log in" />
						<NavItemComponent src={usericon} text="Sign out" />
						<NavItemComponent src={getstartedicon} text="Get started" />
						<NavItemComponent src={settingsicon} text="Settings" />
					</Nav>
					<Nav className="my-3" vertical>
						<NavItemComponent src={addwordsicon} text="Add words" />
						<NavItemComponent src={learnwordsicon} text="Learn words" />
						<NavItemComponent src={mywordsicon} text="My words" />
						<NavItemComponent src={wordstrainericon} text="Words trainer" />
					</Nav>
					<Nav className="my-3" vertical>
						<NavItemComponent src={newsicon} text="News" />
						<NavItemComponent src={abouticon} text="About" />
					</Nav>
				</nav>
	);
}

export default NavBarComponent;