import {
    BETA_KEYS_PREVIOUS_UPDATE,
    BETA_KEYS_PREVIOUS_RESET,
} from '#store/betaKeys/actionTypes';

const initialState: string = '';
const betaKeysPreviousReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case BETA_KEYS_PREVIOUS_UPDATE:
            return initialState;
        case BETA_KEYS_PREVIOUS_RESET:
            if (typeof action.payload !== 'string') return state;
            return action.payload;
        default:
            return state;
    }
};

export default betaKeysPreviousReducer;
