import {
    BETA_KEYS_END_RESET,
    BETA_KEYS_END_UPDATE,
} from '#store/betaKeys/actionTypes';

const initialState: boolean = false;
const betaKeysEndReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case BETA_KEYS_END_RESET:
            return initialState;
        case BETA_KEYS_END_UPDATE:
            if (typeof action.payload !== 'boolean') return state;
            return action.payload;
        default:
            return state;
    }
};

export default betaKeysEndReducer;
