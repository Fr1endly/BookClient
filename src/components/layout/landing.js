import React from 'react'
import { Link } from 'react-router-dom'

export default function landing() {
    return (
        <div>
            <h3>Hello and welcome</h3>
            <Link to='/register'>
                REGISTRATION 
            </Link>
            <br></br>
            <Link to='/login'>
                LOG IN 
            </Link>
        </div>
    )
}
