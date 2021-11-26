import { Reducer } from 'redux';
import {
    TICKETS_PREVIOUS_RESET,
    TICKETS_PREVIOUS_UPDATE,
} from '#store/tickets/actionTypes';

const initialState: string = '';
const ticketsPreviousReducer: Reducer<typeof initialState, Store.Action> = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case TICKETS_PREVIOUS_RESET:
            return initialState;
        case TICKETS_PREVIOUS_UPDATE:
            if (typeof action.payload !== 'string') return state;
            return action.payload;
        default:
            return state;
    }
};

export default ticketsPreviousReducer;
