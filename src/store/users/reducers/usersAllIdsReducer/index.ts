import { checkIfAllIds } from '#store/checkers';
import {
    USERS_ALL_IDS_RESET,
    USERS_ALL_IDS_SET,
} from '#store/users/actionTypes';

const initialState: string[] = [];
const usersAllIdsReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case USERS_ALL_IDS_RESET:
            return initialState;
        case USERS_ALL_IDS_SET:
            if (checkIfAllIds(action.payload))
                return [...state, ...action.payload];
            return state;
        default:
            return state;
    }
};

export default usersAllIdsReducer;
