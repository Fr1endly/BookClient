import React from 'react'
import { Link } from 'react-router-dom';

export default function navbar() {
    return (
        <div className='navbar'>
            <span className='logo'>RnR</span>
            <ul className='nav-links'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/register'>Register</Link></li>
            </ul>
        </div>
    )
}
