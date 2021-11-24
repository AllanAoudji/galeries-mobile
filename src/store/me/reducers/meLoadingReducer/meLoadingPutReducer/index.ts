import { checkIfStatus } from '#store/checkers';
import {
    ME_LOADING_PUT_RESET,
    ME_LOADING_PUT_UPDATE,
} from '#store/me/actionTypes';

const initialState: Store.Status = 'PENDING';
const meLoadingPutReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case ME_LOADING_PUT_RESET:
            return initialState;
        case ME_LOADING_PUT_UPDATE:
            if (!checkIfStatus(action.payload)) return state;
            return action.payload;
        default:
            return state;
    }
};

export default meLoadingPutReducer;
