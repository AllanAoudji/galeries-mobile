import { Dispatch } from 'redux';
import {
    setTicketsAllIds,
    setTicketsById,
    updateTicketsEnd,
    updateTicketsPrevious,
    updateTicketsStatus,
} from '#store/tickets/actionCreators';
import { combineTicketsAllIds } from '#store/combineAllIds';
import { getUserId } from '#store/users/actionCreators';

const successGetMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload.data !== 'object') {
        dispatch(updateTicketsStatus('ERROR'));
        return;
    }

    const allIds: string[] = [];
    const byId: { [key: string]: Store.Models.Ticket } = {};
    const { ticket, tickets } = action.payload.data;
    if (tickets && Array.isArray(tickets))
        tickets.forEach((t: Store.Models.Ticket) => {
            allIds.push(t.id);
            byId[t.id] = t;
        });
    else if (ticket && typeof ticket === 'object') {
        allIds.push(ticket.id);
        byId[ticket.id] = ticket;
    }

    dispatch(setTicketsById(byId));

    const previousTicketId =
        allIds.length > 0 ? allIds[allIds.length - 1] : undefined;
    const previous = previousTicketId
        ? byId[previousTicketId].autoIncrementId
        : undefined;

    if (ticket === undefined) {
        let oldsAllIds: string[];
        if (action.meta.refresh) oldsAllIds = [];
        else oldsAllIds = getState().tickets.allIds || [];
        const newAllIds = combineTicketsAllIds(getState, oldsAllIds, allIds);
        dispatch(setTicketsAllIds(newAllIds));
        dispatch(updateTicketsEnd(allIds.length < 20));
        if (previous) dispatch(updateTicketsPrevious(previous));
    }

    dispatch(updateTicketsStatus('SUCCESS'));

    allIds.forEach((id) => {
        if (!byId[id]) return;
        if (byId[id].userId) dispatch(getUserId(byId[id].userId));
    });
};

export default successGetMethod;
