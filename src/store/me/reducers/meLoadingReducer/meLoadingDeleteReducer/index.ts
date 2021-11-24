import { checkIfStatus } from '#store/checkers';
import {
    ME_LOADING_DELETE_RESET,
    ME_LOADING_DELETE_UPDATE,
} from '#store/me/actionTypes';

const initialState: Store.Status = 'PENDING';
const meLoadingDeleteReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case ME_LOADING_DELETE_RESET:
            return initialState;
        case ME_LOADING_DELETE_UPDATE:
            if (!checkIfStatus(action.payload)) return state;
            return action.payload;
        default:
            return state;
    }
};

export default meLoadingDeleteReducer;
