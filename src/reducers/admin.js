import { 
    GET_USERS

} from '../../src/actions/types'

const initialState = {
    users: [],
}

export default (state=initialState, actions) => { 
    const { payload, type } = actions

    switch(type) {
        case GET_USERS:
            return {
                ...state,
                users: payload
            }
        default:
            return state
    }
}