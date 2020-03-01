import React, { Fragment} from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth'



const Navbar = ({ auth: {isAuthenicated, loading}, logout }) => {
    const authLinks = (
        <Fragment>
            <li>
                <a href="#!" onClick={logout}>Logout</a>
            </li>
            <li>
                <Link to='/admin'>Admin</Link>
            </li>
        </Fragment>
    );
    
    const guestLinks = (
        <Fragment>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/register'>Register</Link></li>
        </Fragment>
    );

    return (
        <div className='navbar'>
            <span className='logo'>RnR</span>
            <ul className='nav-links'>
                <li><Link to='/'>Home</Link></li>
                { !loading && ( isAuthenicated ? authLinks : guestLinks) }
            </ul>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { logout }
)(Navbar)