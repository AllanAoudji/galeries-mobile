import { createSelector } from 'reselect';

const ticketsByIdSelector = (state: Store.Reducer) => state.tickets.byId;
const ticketsCurrentSelector = (state: Store.Reducer) => state.tickets.current;

export const selectCurrentTicket = createSelector(
    [ticketsByIdSelector, ticketsCurrentSelector],
    (ticketsById, ticketsCurrent) => {
        if (!ticketsCurrent) return undefined;
        return ticketsById[ticketsCurrent];
    }
);
export const selectTicketFieldsError = (state: Store.Reducer) =>
    state.tickets.fieldsError;
export const selectTicket = (ticketId?: string | null) =>
    createSelector([ticketsByIdSelector], (ticketsById) => {
        if (!ticketId) return undefined;
        return ticketsById[ticketId];
    });
export const selectTicketsAllIds = (state: Store.Reducer) =>
    state.tickets.allIds;
export const selectTicketsLoadingDelete = (state: Store.Reducer) =>
    state.tickets.loading.delete;
export const selectTicketsLoadingPost = (state: Store.Reducer) =>
    state.tickets.loading.post;
export const selectTicketsStatus = (state: Store.Reducer) =>
    state.tickets.status;
