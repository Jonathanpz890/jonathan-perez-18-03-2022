import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { routes } from '../pages';
import Currency from './Currency';

const Navbar = () => {
    const { pathname } = useLocation();

    return(
        <div className='Navbar'>
            <div className="Navbar__routes">
                {routes.map(route => 
                    <a 
                        key={route.path}
                        href={route.path} 
                        className={`Navbar__routes__route${route.path === pathname ? ' selected' : ''}`}
                    >
                        {route.name}
                    </a>
                )}
            </div>
            <div className="Navbar__currency-conversion">
                <Currency />
            </div>
        </div>
    )
}

export default Navbar;