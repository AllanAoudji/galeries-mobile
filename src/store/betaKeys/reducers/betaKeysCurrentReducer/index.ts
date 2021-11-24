import {
    BETA_KEYS_CURRENT_RESET,
    BETA_KEYS_CURRENT_UPDATE,
} from '#store/betaKeys/actionTypes';

const initialState: string | null = null;
const betaKeysCurrentReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case BETA_KEYS_CURRENT_RESET:
            return initialState;
        case BETA_KEYS_CURRENT_UPDATE:
            if (typeof action.payload !== 'string') return state;
            return action.payload;
        default:
            return state;
    }
};

export default betaKeysCurrentReducer;
