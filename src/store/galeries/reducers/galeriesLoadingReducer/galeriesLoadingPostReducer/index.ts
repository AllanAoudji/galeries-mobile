import { checkIfStatus } from '#store/checkers';
import {
    GALERIES_LOADING_POST_RESET,
    GALERIES_LOADING_POST_UPDATE,
} from '#store/galeries/actionTypes';

const initialState: Store.Status = 'PENDING';
const galeriesLoadingPostReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIES_LOADING_POST_RESET:
            return initialState;
        case GALERIES_LOADING_POST_UPDATE:
            if (checkIfStatus(action.payload)) return action.payload;
            return state;
        default:
            return state;
    }
};

export default galeriesLoadingPostReducer;
