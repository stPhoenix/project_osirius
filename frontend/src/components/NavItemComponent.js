import React from 'react';
import {NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import'./NavItemComponent.css';

export const NavItemComponent = ({src="#", link="#", text="No text", visible=true}) => {
     if (visible){
		 return (
			<NavItem className="media item my-0 py-0">
                <img className="align-self-center link-img" src={src} alt="img" />
                <div className="media-body align-self-center my-0 py-0">
                    <NavLink className="px-1 my-0 py-1 link" tag={Link} to={link}>
						<h4 className="m-0 p-0">{text}</h4>
					</NavLink>
                </div>
        	</NavItem>);
	 } else {
	 	return null;	
	 }
}