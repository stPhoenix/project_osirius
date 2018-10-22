import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import './AppComponent.css';


export const FooterComponent = () => {
    return(<footer className="theme-dark text-white d-flex flex-row py-3 px-3 justify-content-end">
                     <UncontrolledDropdown className="mx-1 d-md-none text-white">
                        <DropdownToggle tag="span">
                            Documents
                        </DropdownToggle>
                        <DropdownMenu className="theme-dark border-0 text-whie">
                            <DropdownItem ><Link to="/privacy_policy" className="text-white link-unstyled">Privacy Policy</Link></DropdownItem>
                            <DropdownItem><Link to="/cookie_policy" className="text-white link-unstyled">Cookie Policy</Link></DropdownItem>
                            <DropdownItem><Link to="/data_collection" className="text-white link-unstyled">Data Collection</Link></DropdownItem>
                        </DropdownMenu>
    </UncontrolledDropdown>
                    <div className="d-none d-md-flex">
                        <p className="mb-0 mx-1"><Link to="/privacy_policy" className="text-white link-unstyled">Privacy Policy</Link></p>
                        <p className="mb-0 mx-1"><Link to="/cookie_policy" className="text-white link-unstyled">Cookie Policy</Link></p>
                        <p className="mb-0 mx-1"><Link to="/data_collection" className="text-white link-unstyled">Data Collection</Link></p>
                    </div>
                    <p className="mb-0">Copyright 2018 Linguint.pro</p>
            </footer>);
};