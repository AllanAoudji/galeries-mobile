import {
    USERS_PREVIOUS_RESET,
    USERS_PREVIOUS_UPDATE,
} from '#store/users/actionTypes';

const initialState: string = '';
const usersPreviousReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case USERS_PREVIOUS_RESET:
            return initialState;
        case USERS_PREVIOUS_UPDATE:
            if (typeof action.payload === 'string') return action.payload;
            return state;
        default:
            return state;
    }
};

export default usersPreviousReducer;
