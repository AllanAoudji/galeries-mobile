import { USERS_END_RESET, USERS_END_UPDATE } from '#store/users/actionTypes';

const initialState: { [key: string]: boolean } = {};
const usersEndReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case USERS_END_RESET:
            return initialState;
        case USERS_END_UPDATE:
            if (typeof action.payload !== 'boolean') return state;
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

export default usersEndReducer;
