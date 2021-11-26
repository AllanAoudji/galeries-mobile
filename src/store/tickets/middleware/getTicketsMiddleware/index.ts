import { Middleware } from 'redux';

import { dispatchGetTicket, dispatchGetTickets } from '#store/dispatchers';
import { TICKETS_GET } from '#store/tickets/actionTypes';
import { updateTicketsStatus } from '#store/tickets/actionCreators';

const getTicketsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== TICKETS_GET) return;

        const ticketId = action.meta.query
            ? action.meta.query.ticketId
            : undefined;

        if (ticketId) dispatchGetTicket(dispatch, ticketId);
        else {
            const { end, previous, status } = getState().tickets;
            if (end) return;
            if (status.includes('LOADING')) return;
            if (status === 'REFRESH') return;

            const newStatus: Store.Status =
                status === 'PENDING' ? 'INITIAL_LOADING' : 'LOADING';
            dispatch(updateTicketsStatus(newStatus));
            dispatchGetTickets(dispatch, previous);
        }
    };

export default getTicketsMiddleware;
