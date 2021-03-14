import { userConstants } from '../_constants';

export function edituser(state = {}, action) {
    switch (action.type) {
        case userConstants.GET_REQUEST:
            return {
                loading: true
            };
        case userConstants.GET_SUCCESS:
            return {
               user: action.user
            };
        case userConstants.GET_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}