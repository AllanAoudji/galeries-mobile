import { ME_STATUS_RESET, ME_STATUS_UPDATE } from '#store/me/actionTypes';

const intialState: Store.Status = 'PENDING';
const meStatusReducer = (state = intialState, action: Store.Action) => {
    switch (action.type) {
        case ME_STATUS_RESET:
            return intialState;
        case ME_STATUS_UPDATE:
            if (typeof action.payload === 'string') return action.payload;
            return state;
        default:
            return state;
    }
};

export default meStatusReducer;
