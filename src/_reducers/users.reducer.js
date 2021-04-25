import { userConstants } from '../_constants';

export function users(state = {}, action) {
    switch (action.type) {
        case userConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case userConstants.GETALL_SUCCESS:
            return {
                items: action.users
            };
        case userConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case userConstants.DELETE_REQUEST:
            return {
                ...state,
                items: state.items.map(user =>
                    user.username === action.username
                        ? { ...user, deleting: true }
                        : user
                )
            };
        case userConstants.DELETE_SUCCESS:
            return {
                items: state.items.filter(user => user.username !== action.username)
            };
        case userConstants.DELETE_FAILURE:
            return {
                ...state,
                items: state.items.map(user => {
                    if (user.username === action.username) {
                        const { deleting, ...userCopy } = user;
                        return { ...userCopy, deleteError: action.error };
                    }

                    return user;
                })
            };
        default:
            return state
    }
}