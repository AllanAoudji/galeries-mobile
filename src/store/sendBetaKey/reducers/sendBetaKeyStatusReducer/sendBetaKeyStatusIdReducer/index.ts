import { checkIfStatus } from '#store/checkers';
import {
    SEND_BETA_KEY_STATUS_ID_RESET,
    SEND_BETA_KEY_STATUS_ID_UPDATE,
} from '#store/sendBetaKey/actionTypes';

const initialState: { [key: string]: Store.Status } = {};
const sendBetaKeyStatusIdReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case SEND_BETA_KEY_STATUS_ID_RESET:
            return initialState;
        case SEND_BETA_KEY_STATUS_ID_UPDATE:
            if (!action.meta.query) return state;
            if (!action.meta.query.betaKeyId) return state;
            if (!checkIfStatus(action.payload)) return state;
            return {
                ...state,
                [action.meta.query.betaKeyId]: action.payload,
            };
        default:
            return state;
    }
};

export default sendBetaKeyStatusIdReducer;
