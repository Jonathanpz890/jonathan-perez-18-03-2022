import { Spin as Hamburger } from 'hamburger-react';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Collapse, Nav, Navbar as Navigation, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { routes } from '../pages';
import Currency from './Currency';


const Navbar = () => {
    const { pathname } = useLocation();
    const [expandNavbar, setExpandNavbar] = useState(false)

    return (
        <Navigation
            expand="sm"
        >
            <NavbarToggler onClick={() => setExpandNavbar(!expandNavbar)}>
                <Hamburger color='white' toggle={() => setExpandNavbar(!expandNavbar)} toggled={expandNavbar} />
            </NavbarToggler>
            <Collapse navbar isOpen={expandNavbar}>
                <Nav
                    className="me-auto navbar__routes"
                    navbar
                >
                    {routes.map(route =>
                        <NavItem key={route.path}>
                            <NavLink href={route.path} className={`navbar__routes__route${route.path === pathname ? ' selected' : ''}`}>
                                {route.name}
                            </NavLink>
                        </NavItem>
                    )}
                </Nav>
                <div className="navbar__currency-conversion">
                    <Currency />
                </div>
            </Collapse>
        </Navigation>
    )
}

export default Navbar;