import {
    TICKETS_ALL_IDS_REMOVE,
    TICKETS_ALL_IDS_RESET,
    TICKETS_ALL_IDS_SET,
    TICKETS_BY_ID_REMOVE,
    TICKETS_BY_ID_RESET,
    TICKETS_BY_ID_SET,
    TICKETS_CURRENT_RESET,
    TICKETS_CURRENT_UPDATE,
    TICKETS_DELETE,
    TICKETS_END_RESET,
    TICKETS_END_UPDATE,
    TICKETS_GET,
    TICKETS_LOADING_DELETE_RESET,
    TICKETS_LOADING_DELETE_UPDATE,
    TICKETS_LOADING_POST_RESET,
    TICKETS_LOADING_POST_UPDATE,
    TICKETS_POST,
    TICKETS_PREVIOUS_RESET,
    TICKETS_PREVIOUS_UPDATE,
    TICKETS_RESET,
    TICKETS_STATUS_RESET,
    TICKETS_STATUS_UPDATE,
} from '#store/tickets/actionTypes';

export const deleteTicket: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: TICKETS_DELETE,
});
export const getTicket: (ticketId: string) => Store.Action = (ticketId) => ({
    meta: { query: { ticketId } },
    payload: {},
    type: TICKETS_GET,
});
export const getTickets: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: TICKETS_GET,
});
export const postTickets: (payload: {
    body: string;
    header: string;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: TICKETS_POST,
});
export const removeTicketsAllIds: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: TICKETS_ALL_IDS_REMOVE,
});
export const removeTicketsById: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: TICKETS_BY_ID_REMOVE,
});
export const resetTickets: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: TICKETS_RESET,
});
export const resetTicketsAllIds: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: TICKETS_ALL_IDS_RESET,
});
export const resetTicketsById: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: TICKETS_BY_ID_RESET,
});
export const resetTicketsCurrent: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: TICKETS_CURRENT_RESET,
});
export const resetTicketsEnd: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: TICKETS_END_RESET,
});
export const resetTicketsLoadingDelete: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: TICKETS_LOADING_DELETE_RESET,
});
export const resetTicketLoadingPost: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: TICKETS_LOADING_POST_RESET,
});
export const resetTicketsPrevious: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: TICKETS_PREVIOUS_RESET,
});
export const resetTicketsStatus: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: TICKETS_STATUS_RESET,
});
export const setTicketsAllIds: (payload: string[]) => Store.Action = () => ({
    meta: {},
    payload: {},
    type: TICKETS_ALL_IDS_SET,
});
export const setTicketsById: (payload: {
    [key: string]: Store.Models.Ticket;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: TICKETS_BY_ID_SET,
});
export const updateTicketsCurrent: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: TICKETS_CURRENT_UPDATE,
});
export const updateTicketsEnd: (payload: boolean) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: TICKETS_END_UPDATE,
});
export const updateTicketsLoadingDelete: (
    payload: Store.Status
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: TICKETS_LOADING_DELETE_UPDATE,
});
export const updateTicketsLoadingPost: (payload: Store.Status) => Store.Action =
    (payload) => ({
        meta: {},
        payload,
        type: TICKETS_LOADING_POST_UPDATE,
    });
export const updateTicketsPrevious: (payload?: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: TICKETS_PREVIOUS_UPDATE,
});
export const updateTicketsStatus: (payload: Store.Status) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: TICKETS_STATUS_UPDATE,
});
