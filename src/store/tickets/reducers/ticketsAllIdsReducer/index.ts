import { checkIfAllIds } from '#store/checkers';
import {
    TICKETS_ALL_IDS_REMOVE,
    TICKETS_ALL_IDS_RESET,
    TICKETS_ALL_IDS_SET,
} from '#store/tickets/actionTypes';

const initialState: string[] = [];
const ticketsAllIdsReducer = (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case TICKETS_ALL_IDS_REMOVE: {
            if (typeof action.payload !== 'string') return state;
            const newAllIds = state.filter((id) => id !== action.payload);
            return { ...newAllIds };
        }
        case TICKETS_ALL_IDS_RESET:
            return initialState;
        case TICKETS_ALL_IDS_SET:
            if (!checkIfAllIds(action.payload)) return state;
            return action.payload;
        default:
            return state;
    }
};

export default ticketsAllIdsReducer;
