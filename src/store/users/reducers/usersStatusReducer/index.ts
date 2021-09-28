import { checkIfStatus } from '#store/checkers';
import {
    USERS_STATUS_RESET,
    USERS_STATUS_UPDATE,
} from '#store/users/actionTypes';

const intialState: Store.Status = 'PENDING';
const usersStatusReducer = (state = intialState, action: Store.Action) => {
    switch (action.type) {
        case USERS_STATUS_RESET:
            return intialState;
        case USERS_STATUS_UPDATE:
            if (checkIfStatus(action.payload)) return action.payload;
            return state;
        default:
            return state;
    }
};

export default usersStatusReducer;
