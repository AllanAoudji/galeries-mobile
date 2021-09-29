import {
    USERS_BY_ID_RESET,
    USERS_BY_ID_SET,
    USERS_BY_ID_UPDATE,
} from '#store/users/actionTypes';

const initialState: { [key: string]: Store.Models.User } = {};
const usersByIdReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case USERS_BY_ID_RESET:
            return initialState;
        case USERS_BY_ID_SET:
            if (typeof action.payload === 'object')
                return {
                    ...state,
                    ...action.payload,
                };
            return state;
        case USERS_BY_ID_UPDATE:
            if (typeof action.payload === 'object')
                return {
                    ...state,
                    [action.payload.id]: { ...action.payload },
                };
            return state;
        default:
            return state;
    }
};

export default usersByIdReducer;
