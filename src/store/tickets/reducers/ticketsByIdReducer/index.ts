import {
    TICKETS_BY_ID_REMOVE,
    TICKETS_BY_ID_RESET,
    TICKETS_BY_ID_SET,
} from '#store/tickets/actionTypes';

const initialState: { [key: string]: Store.Models.Ticket } = {};
const ticketsByIdReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case TICKETS_BY_ID_REMOVE: {
            if (typeof action.payload !== 'string') return state;
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        }
        case TICKETS_BY_ID_RESET:
            return initialState;
        case TICKETS_BY_ID_SET:
            if (typeof action.payload !== 'object') return state;
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default ticketsByIdReducer;
