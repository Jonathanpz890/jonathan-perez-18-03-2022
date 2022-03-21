import React, { useState } from 'react';
import { useEffect } from 'react';
import Logo from '../assets/logo.png';

const Loading = ({ loading }) => {
    const [display, setDisplay] = useState(true)
    const [opacity, setOpacity] = useState(1)

    useEffect(() => {
        if (loading) {
            setDisplay(true);
            setOpacity(1);
        } else {
            setOpacity(0);
            setTimeout(() => {
                setDisplay(false);
            }, 1000)
        }
    }, [loading])
    if (display) {
        return(
            <div className='Loading' style={{
                opacity
            }}>
                <img src={Logo} alt='logo' />
            </div>
        )
    } else {
        return false;
    }
}

export default Loading;