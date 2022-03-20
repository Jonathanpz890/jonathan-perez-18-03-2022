import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { routes } from '../pages';
import { Autocomplete, TextField } from '@mui/material';

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
        </div>
    )
}

export default Navbar;