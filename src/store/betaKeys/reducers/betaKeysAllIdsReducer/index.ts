import {
    BETA_KEYS_ALL_IDS_REMOVE,
    BETA_KEYS_ALL_IDS_RESET,
    BETA_KEYS_ALL_IDS_SET,
} from '#store/betaKeys/actionTypes';

const initialState: string[] = [];
const betaKeysAllIdsReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case BETA_KEYS_ALL_IDS_REMOVE:
            if (typeof action.payload !== 'string') return state;
            return state.filter((betaKeyId) => betaKeyId !== action.payload);
        case BETA_KEYS_ALL_IDS_RESET:
            return initialState;
        case BETA_KEYS_ALL_IDS_SET:
            if (!Array.isArray(action.payload)) return state;
            return action.payload;
        default:
            return state;
    }
};

export default betaKeysAllIdsReducer;
