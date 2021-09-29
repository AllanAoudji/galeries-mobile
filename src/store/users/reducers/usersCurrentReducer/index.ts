import {
    USERS_CURRENT_RESET,
    USERS_CURRENT_UPDATE,
} from '#store/users/actionTypes';

const initialState: string | null = null;
const usersCurrentReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case USERS_CURRENT_RESET:
            return initialState;
        case USERS_CURRENT_UPDATE:
            if (typeof action.payload === 'string') return action.payload;
            return state;
        default:
            return state;
    }
};

export default usersCurrentReducer;
