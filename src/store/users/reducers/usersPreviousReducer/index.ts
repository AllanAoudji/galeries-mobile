import {
    USERS_PREVIOUS_RESET,
    USERS_PREVIOUS_UPDATE,
} from '#store/users/actionTypes';

const initialState: { [key: string]: string } = {};
const usersPreviousReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case USERS_PREVIOUS_RESET:
            return initialState;
        case USERS_PREVIOUS_UPDATE:
            if (typeof action.payload !== 'string') return state;
            if (action.meta.query && action.meta.query.galerieId)
                return {
                    ...state,
                    [action.meta.query.galerieId]: action.payload,
                };
            return {
                ...state,
                '': action.payload,
            };
        default:
            return state;
    }
};

export default usersPreviousReducer;
