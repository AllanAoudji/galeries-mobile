import { checkIfStatus } from '#store/checkers';
import {
    LOGIN_STATUS_RESET,
    LOGIN_STATUS_UPDATE,
} from '#store/login/actionTypes';

const initialState: Store.Status = 'PENDING';
const loginStatusReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case LOGIN_STATUS_RESET:
            return initialState;
        case LOGIN_STATUS_UPDATE:
            if (checkIfStatus(action.payload)) return action.payload;
            return state;
        default:
            return state;
    }
};

export default loginStatusReducer;
