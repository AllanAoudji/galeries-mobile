import { Middleware } from 'redux';

import { dispatchRefreshTickets } from '#store/dispatchers';
import { updateTicketsStatus } from '#store/tickets/actionCreators';
import { TICKETS_REFRESH } from '#store/tickets/actionTypes';

const refreshTicketsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== TICKETS_REFRESH) return;

        const { status } = getState().tickets;
        if (status.includes('LOADING')) return;
        if (status === 'REFRESH') return;

        dispatch(updateTicketsStatus('REFRESH'));
        dispatchRefreshTickets(dispatch);
    };

export default refreshTicketsMiddleware;
