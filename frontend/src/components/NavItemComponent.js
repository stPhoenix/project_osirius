import React from 'react';
import {NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import'./NavItemComponent.css';

export const NavItemComponent = ({src="#", link="#", text="No text", visible=true}) => {
     if (visible){
		 return (
			<NavItem className="media item">
                <img className="align-self-center link-img" src={src} alt="img" />
                <div className="media-body align-self-center">
                    <NavLink className="link p-1" tag={Link} to={link}>
						<h4 className="m-0 p-0">{text}</h4>
					</NavLink>
                </div>
        	</NavItem>);
	 } else {
	 	return null;	
	 }
};