import {userConstants} from '../_constants';

export function edituser(state = {}, action) {
    switch (action.type) {
        case userConstants.SAVE_USER:
            return action.user;

        case userConstants.UPDATE_USER_REQUEST:
            return {
                loading: true
            };
        case userConstants.UPDATE_USER_SUCCESS:
            return {
                edituser: action.user
            };
        case userConstants.UPDATE_USER_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}