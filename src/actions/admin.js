import axios from 'axios';
import { GET_USERS } from './types'
import setAuthToken from '../utils/setAuthToken';

export const getUsers = () => async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('http://localhost:3000/api/users')
        dispatch({
            type: GET_USERS,
            payload: res.data
        })
    } catch(err) {
        const errors = err.response.data.errors
        errors.forEach( error => console.log(error))
    }
}