import React, { Fragment, useState } from 'react'


//Do redux now
export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        return null
    }

    return (
        <Fragment>
            <form className='form'>
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
