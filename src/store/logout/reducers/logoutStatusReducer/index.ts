import { checkIfStatus } from '#store/checkers';
import {
    LOGOUT_STATUS_RESET,
    LOGOUT_STATUS_UPDATE,
} from '#store/logout/actionTypes';

const initialState: Store.Status = 'PENDING';
const logoutStatusReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case LOGOUT_STATUS_RESET:
            return initialState;
        case LOGOUT_STATUS_UPDATE:
            if (checkIfStatus(action.payload)) return action.payload;
            return state;
        default:
            return state;
    }
};

export default logoutStatusReducer;
