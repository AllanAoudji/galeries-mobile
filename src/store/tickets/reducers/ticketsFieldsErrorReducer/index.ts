import { Reducer } from 'redux';

import {
    TICKETS_FIELDS_ERROR_RESET,
    TICKETS_FIELDS_ERROR_UPDATE,
} from '#store/tickets/actionTypes';

const initialState: { body: string; header: string } = {
    body: '',
    header: '',
};
const ticketsFieldsErrorReducer: Reducer<typeof initialState, Store.Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case TICKETS_FIELDS_ERROR_RESET:
            return initialState;
        case TICKETS_FIELDS_ERROR_UPDATE:
            if (
                typeof action.payload === 'object' &&
                (typeof action.payload.body === 'string' ||
                    typeof action.payload.header === 'string')
            )
                return { ...state, ...action.payload };
            return state;
        default:
            return state;
    }
};

export default ticketsFieldsErrorReducer;
