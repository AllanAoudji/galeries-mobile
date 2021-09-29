import { checkIfStatus } from '#store/checkers';
import {
    FORGOT_YOUR_PASSWORD_STATUS_RESET,
    FORGOT_YOUR_PASSWORD_STATUS_UPDATE,
} from '#store/forgotYourPassword/actionTypes';

const initalState: Store.Status = 'PENDING';
const forgotYourPasswordStatusReducer = (
    state = initalState,
    action: Store.Action
) => {
    switch (action.type) {
        case FORGOT_YOUR_PASSWORD_STATUS_RESET:
            return initalState;
        case FORGOT_YOUR_PASSWORD_STATUS_UPDATE:
            if (checkIfStatus(action.payload)) return action.payload;
            return state;
        default:
            return state;
    }
};

export default forgotYourPasswordStatusReducer;
