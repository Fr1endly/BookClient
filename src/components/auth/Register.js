import React, { Fragment, useState } from 'react';
import { register  } from '../../actions/auth'; 
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

function Register({ register, isAuthenicated }) {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        password2: ''
    })

    const { email, name, password, password2 } = formData

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(password!==password2) {
            console.log('PASSWORDS DON"T MATCH')
        } else {
            register({ name, email, password})
        }
    }

    if(isAuthenicated) {
        return <Redirect to='/' />
    }

    return (
        <Fragment>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <h3 >Please sign in</h3>
                <div className="form-group">
                    <input 
                        type='email'
                        name='email'
                        id="email"
                        placeholder='email'
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type='text'
                        name='name'
                        id="name"
                        placeholder='name'
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type='password'
                        name='password'
                        id="password"
                        placeholder='password'
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type='password'
                        name='password2'
                        id="password2"
                        placeholder='Confirm password'
                        onChange={e => onChange(e)}
                    />
                </div>
                <hr/>
                <div className='form-group'>
                    <input type='submit' value="Submit" style={{ marginTop: '15px'}} />
                </div>
               
            </form>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    isAuthenicated: state.auth.isAuthenicated
})

export default connect(
    mapStateToProps,
    { register }
)(Register)