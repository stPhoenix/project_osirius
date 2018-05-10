import React from 'react';
import {NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';

export const NavItemComponent = ({src="#", link="#", text="No text"}) => {
    return (
        <NavItem className="media">
                <img style={{height:'2.30rem', width:'auto'}} className="align-self-center" src={src} alt="img" />
                <div className="media-body align-self-center">
                    <NavLink className="px-1 py-0" tag={Link} to={link}><h4 className="m-0">{text}</h4></NavLink>
                </div>
        </NavItem>
    );
}