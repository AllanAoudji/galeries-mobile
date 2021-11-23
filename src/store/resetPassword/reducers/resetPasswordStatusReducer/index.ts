import { checkIfStatus } from '#store/checkers';
import {
    RESET_PASSWORD_STATUS_RESET,
    RESET_PASSWORD_STATUS_UPDATE,
} from '#store/resetPassword/actionTypes';

const initialState: Store.Status = 'PENDING';
const resetPasswordStatusReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case RESET_PASSWORD_STATUS_RESET:
            return initialState;
        case RESET_PASSWORD_STATUS_UPDATE:
            if (!checkIfStatus(action.payload)) return state;
            return action.payload;
        default:
            return state;
    }
};

export default resetPasswordStatusReducer;
