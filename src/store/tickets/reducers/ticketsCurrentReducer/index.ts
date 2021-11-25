import {
    TICKETS_CURRENT_RESET,
    TICKETS_CURRENT_UPDATE,
} from '#store/tickets/actionTypes';

const initialState: string | null = null;
const ticketsCurrentReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case TICKETS_CURRENT_RESET:
            return initialState;
        case TICKETS_CURRENT_UPDATE:
            if (typeof action.payload !== 'string') return state;
            return action.payload;
        default:
            return state;
    }
};

export default ticketsCurrentReducer;
