import { checkIfStatus } from '#store/checkers';
import {
    BETA_KEYS_STATUS_RESET,
    BETA_KEYS_SATUS_UPDATE,
} from '#store/betaKeys/actionTypes';

const initialState: Store.Status = 'PENDING';
const betaKeysStatusReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case BETA_KEYS_STATUS_RESET:
            return initialState;
        case BETA_KEYS_SATUS_UPDATE:
            if (!checkIfStatus(action.payload)) return state;
            return action.payload;
        default:
            return state;
    }
};

export default betaKeysStatusReducer;
