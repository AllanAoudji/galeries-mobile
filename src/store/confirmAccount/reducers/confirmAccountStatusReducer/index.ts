import { checkIfStatus } from '#store/checkers';
import {
    CONFIRM_ACCOUNT_STATUS_RESET,
    CONFIRM_ACCOUNT_STATUS_UPDATE,
} from '#store/confirmAccount/actionTypes';

const initialState: Store.Status = 'PENDING';
const confirmAccountStatusReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case CONFIRM_ACCOUNT_STATUS_RESET:
            return initialState;
        case CONFIRM_ACCOUNT_STATUS_UPDATE:
            if (!checkIfStatus(action.payload)) return state;
            return action.payload;
        default:
            return state;
    }
};

export default confirmAccountStatusReducer;
