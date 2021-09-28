import { USERS_END_RESET, USERS_END_UPDATE } from '#store/users';

const initialState: boolean = false;
const usersEndReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case USERS_END_RESET:
            return initialState;
        case USERS_END_UPDATE:
            if (typeof action.payload === 'boolean') return action.payload;
            return state;
        default:
            return state;
    }
};

export default usersEndReducer;
