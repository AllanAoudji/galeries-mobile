import { checkIfStatus } from '#store/checkers';
import {
    TICKETS_LOADING_POST_RESET,
    TICKETS_LOADING_POST_UPDATE,
} from '#store/tickets/actionTypes';

const initialState: Store.Status = 'PENDING';
const ticketsLoadingPostReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case TICKETS_LOADING_POST_RESET:
            return initialState;
        case TICKETS_LOADING_POST_UPDATE:
            if (!checkIfStatus(action.payload)) return state;
            return action.payload;
        default:
            return state;
    }
};

export default ticketsLoadingPostReducer;
