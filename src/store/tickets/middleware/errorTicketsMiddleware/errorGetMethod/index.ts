import { Dispatch } from 'redux';
import {
    removeTicketsAllIds,
    removeTicketsById,
    updateTicketsStatus,
} from '#store/tickets/actionCreators';

const errorGetMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    dispatch(updateTicketsStatus('ERROR'));
    const ticketId = action.meta.query ? action.meta.query.ticketId : undefined;
    if (!ticketId) return;
    const ticket = getState().tickets.byId[ticketId];
    if (!ticket) return;
    dispatch(removeTicketsAllIds(ticketId));
    dispatch(removeTicketsById(ticketId));
};

export default errorGetMethod;
