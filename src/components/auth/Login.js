import React, { Fragment, useState } from 'react';
import { login  } from '../../actions/auth'; 
import { connect } from 'react-redux';

function Login({ login }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        login({ email, password})
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
                        type='password'
                        name='password'
                        id="password"
                        placeholder='password'
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

export default connect(
    null,
    { login }
)(Login)