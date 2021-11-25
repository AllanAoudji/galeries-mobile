import { Reducer } from 'redux';

import { checkIfStatus } from '#store/checkers';
import {
    TICKETS_STATUS_RESET,
    TICKETS_STATUS_UPDATE,
} from '#store/tickets/actionTypes';

const initialState: Store.Status = 'PENDING';
const ticketsStatusReducer: Reducer<typeof initialState, Store.Action> = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case TICKETS_STATUS_RESET:
            return initialState;
        case TICKETS_STATUS_UPDATE:
            if (!checkIfStatus(action.payload)) return state;
            return action.payload;
        default:
            return state;
    }
};

export default ticketsStatusReducer;
