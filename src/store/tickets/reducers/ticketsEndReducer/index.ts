import {
    TICKETS_END_RESET,
    TICKETS_END_UPDATE,
} from '#store/tickets/actionTypes';

const initialState: boolean = false;
const ticketsEndReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case TICKETS_END_RESET:
            return initialState;
        case TICKETS_END_UPDATE:
            if (typeof action.payload !== 'boolean') return state;
            return action.payload;
        default:
            return state;
    }
};

export default ticketsEndReducer;
