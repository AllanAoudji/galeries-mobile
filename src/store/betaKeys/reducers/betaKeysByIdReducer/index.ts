import {
    BETA_KEYS_BY_ID_REMOVE,
    BETA_KEYS_BY_IDS_RESET,
    BETA_KEYS_BY_IDS_SET,
} from '#store/betaKeys/actionTypes';

const initialState: { [key: string]: Store.Models.BetaKeys } = {};
const betaKeysByIdReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case BETA_KEYS_BY_ID_REMOVE: {
            if (typeof action.payload !== 'string') return state;
            const newState = { ...state };
            delete newState[action.payload];
            return { ...newState };
        }
        case BETA_KEYS_BY_IDS_RESET:
            return initialState;
        case BETA_KEYS_BY_IDS_SET:
            if (typeof action.payload !== 'object') return state;
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default betaKeysByIdReducer;
