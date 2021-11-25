import { Dispatch } from 'redux';

import {
    removeTicketsAllIds,
    removeTicketsById,
    updateTicketsLoadingDelete,
} from '#store/tickets/actionCreators';

const successDeleteMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload.data !== 'object') {
        dispatch(updateTicketsLoadingDelete('ERROR'));
        return;
    }

    const { ticketId } = action.payload.data;
    if (typeof ticketId !== 'string') {
        dispatch(updateTicketsLoadingDelete('ERROR'));
        return;
    }

    const ticket = getState().tickets.byId[ticketId];
    if (ticket) {
        dispatch(removeTicketsAllIds(ticketId));
        dispatch(removeTicketsById(ticketId));
    }
    dispatch(updateTicketsLoadingDelete('SUCCESS'));
};

export default successDeleteMethod;
