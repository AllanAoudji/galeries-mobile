import { checkIfStatus } from '#store/checkers';
import {
    USERS_LOADING_DELETE_RESET,
    USERS_LOADING_DELETE_UPDATE,
} from '#store/users/actionTypes';

const initialState: Store.Status = 'PENDING';
const usersLoadingDeleteReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case USERS_LOADING_DELETE_RESET:
            return initialState;
        case USERS_LOADING_DELETE_UPDATE:
            if (!checkIfStatus(action.payload)) return state;
            return action.payload;
        default:
            return state;
    }
};

export default usersLoadingDeleteReducer;
