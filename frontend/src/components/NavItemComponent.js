import React from 'react';
import {NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import'./NavItemComponent.css';
import PropTypes from 'prop-types';

const componentProps = {
    src: PropTypes.string,
    link: PropTypes.string,
    text: PropTypes.string,
    visible: PropTypes.bool,
};

export const NavItemComponent = ({src="#", link="#", text="No text", visible=true}) => {
     if (visible){
		 return (
			<NavItem className="media item">
                <img className="align-self-center link-img" src={src} alt="img" />
                <div className="media-body align-self-center">
                    <NavLink className="link p-1" tag={Link} to={link}>
						<h5 className="m-0 p-0">{text}</h5>
					</NavLink>
                </div>
        	</NavItem>);
	 } else {
	 	return null;	
	 }
};

NavItem.propTypes = componentProps;