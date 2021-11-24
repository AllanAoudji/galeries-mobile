import { checkIfStatus } from '#store/checkers';
import {
    BETA_KEYS_LOADING_POST_RESET,
    BETA_KEYS_LOADING_POST_UPDATE,
} from '#store/betaKeys/actionTypes';

const initialState: Store.Status = 'PENDING';
const betaKeysLoadingPostReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case BETA_KEYS_LOADING_POST_RESET:
            return initialState;
        case BETA_KEYS_LOADING_POST_UPDATE:
            if (!checkIfStatus(action.payload)) return state;
            return action.payload;
        default:
            return state;
    }
};

export default betaKeysLoadingPostReducer;
