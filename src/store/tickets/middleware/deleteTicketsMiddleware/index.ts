import { Middleware } from 'redux';

import { dispatchDeleteTicket } from '#store/dispatchers';
import { updateTicketsLoadingDelete } from '#store/tickets/actionCreators';
import { TICKETS_DELETE } from '#store/tickets/actionTypes';

const deleteTicketMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== TICKETS_DELETE) return;
        if (typeof action.payload !== 'string') return;

        const loading = getState().tickets.loading.delete;
        if (loading.includes('LOADING')) return;

        dispatch(updateTicketsLoadingDelete('LOADING'));
        dispatchDeleteTicket(dispatch, action.payload);
    };

export default deleteTicketMiddleware;
