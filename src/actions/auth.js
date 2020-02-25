import axios from 'axios';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS
} from './types'

// REGISTER
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password})

    try {
        const res = await axios.post('http://localhost:3000/api/users', body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        console.log('User succesfuly registered')
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors) {
            errors.forEach(error => console.log(error));
        }

        dispatch({
            type: REGISTER_FAIL
        })
    }
}

// Login
export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password})

    try {
        const res = await axios.post('/api/auth', body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

    } catch (err) {
        const errros = err.response.data.errors
        if (erros) {
            errors.forEach(error => console.log(error))
        }
    }
}