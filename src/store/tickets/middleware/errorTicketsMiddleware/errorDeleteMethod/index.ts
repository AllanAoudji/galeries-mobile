import { Dispatch } from 'redux';

import {
    getTicket,
    updateTicketsLoadingDelete,
} from '#store/tickets/actionCreators';
import { dispatchErrorNotification } from '#store/dispatchers';

const errorDeleteMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    dispatch(updateTicketsLoadingDelete('ERROR'));
    dispatchErrorNotification(dispatch, action);

    const ticketId = action.meta.query ? action.meta.query.ticketId : undefined;
    if (!ticketId) return;
    const ticket = getState().tickets.byId[ticketId];
    if (!ticket) return;
    dispatch(getTicket(ticketId));
};

export default errorDeleteMethod;
