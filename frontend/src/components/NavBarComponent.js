import React from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';

const NavBarComponent = ({isAuthenticated}) => {
	return (
				<nav>
                	<Nav vertical>
						<NavItem visible={!isAuthenticated} >
							<NavLink href="#">Sign Up</NavLink>
						</NavItem>
						<NavItem visible={!isAuthenticated} >
							<NavLink href="#">Log in</NavLink>
						</NavItem>
						<NavItem visible={isAuthenticated} >
							<NavLink href="#">Sign Out</NavLink>
						</NavItem>
						<NavItem >
							<NavLink href="#">Get started</NavLink>
						</NavItem>
						<NavItem visible={isAuthenticated} >
							<NavLink href="#">Settings</NavLink>
						</NavItem>
					</Nav>
					<Nav vertical>
						<NavItem visible={isAuthenticated} >
							<NavLink href="#">Add words</NavLink>
						</NavItem>
						<NavItem visible={isAuthenticated} >
							<NavLink href="#">Learn words</NavLink>
						</NavItem>
						<NavItem visible={isAuthenticated} >
							<NavLink href="#">My words</NavLink>
						</NavItem>
						<NavItem visible={isAuthenticated} >
							<NavLink href="#">Words trainer	</NavLink>
						</NavItem>
					</Nav>
					<Nav vertical>
						<NavItem >
							<NavLink href="#">News</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="#">About</NavLink>
						</NavItem>
					</Nav>
				</nav>
	);
}

export default NavBarComponent;