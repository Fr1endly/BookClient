import { REGISTER_SUCCESS,
     REGISTER_FAIL, 
     USER_LOADED, 
     AUTH_ERROR,
     LOGIN_SUCCESS,
     LOGIN_FAIL
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenicated: null,
    loading: true,
    user: null
}

export default (state=initialState, action) => {
    const { type, payload } = action 

    switch(type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenicated: true,
                loading: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenicated: true,
                loading: false
            }
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            return {
                ...state,
                ...payload,
                token: null,
                isAuthenicated: false,
                loading: false
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenicated: true,
                loading: false,
                user: payload
            }
        default:
            return state
    }
}