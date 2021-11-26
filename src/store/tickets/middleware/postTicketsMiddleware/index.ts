import { Middleware } from 'redux';

import { dispatchPostTicket } from '#store/dispatchers';
import { updateTicketsLoadingPost } from '#store/tickets/actionCreators';
import { TICKETS_POST } from '#store/tickets/actionTypes';

const postTicketMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== TICKETS_POST) return;
        if (typeof action.payload !== 'object') return;
        if (typeof action.payload.body !== 'string') return;
        if (typeof action.payload.header !== 'string') return;

        const loading = getState().tickets.loading.post;
        if (loading.includes('LOADING')) return;

        dispatch(updateTicketsLoadingPost('LOADING'));
        dispatchPostTicket(dispatch, action.payload);
    };

export default postTicketMiddleware;
