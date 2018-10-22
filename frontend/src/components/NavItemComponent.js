import React from 'react';
import {NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import'./NavItemComponent.css';
import PropTypes from 'prop-types';

const componentProps = {
    link: PropTypes.string,
    text: PropTypes.string,
    visible: PropTypes.bool,
};

export const NavItemComponent = ({link="#", text="No text", visible=true}) => {
     if (visible){
		 return (
			<NavItem className="active">
                    <NavLink tag={Link} to={link}>{text}</NavLink>
        	</NavItem>);
	 } else {
	 	return null;	
	 }
};

NavItem.propTypes = componentProps;