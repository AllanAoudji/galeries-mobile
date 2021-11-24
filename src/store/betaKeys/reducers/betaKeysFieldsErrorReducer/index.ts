import {
    BETA_KEYS_FIELDS_ERROR_RESET,
    BETA_KEYS_FIELDS_ERROR_UPDATE,
} from '#store/betaKeys/actionTypes';

const initialState: { email: string } = { email: '' };
const betaKeysFieldsErrorReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case BETA_KEYS_FIELDS_ERROR_RESET:
            return initialState;
        case BETA_KEYS_FIELDS_ERROR_UPDATE:
            if (typeof action.payload !== 'object') return state;
            if (typeof action.payload.email !== 'string') return state;
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default betaKeysFieldsErrorReducer;
