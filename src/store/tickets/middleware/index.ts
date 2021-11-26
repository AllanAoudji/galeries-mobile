import deleteTicketsMiddleware from './deleteTicketsMiddleware';
import errorTicketsMiddleware from './errorTicketsMiddleware';
import getTicketsMiddleware from './getTicketsMiddleware';
import postTicketsMiddleware from './postTicketsMiddleware';
import refreshTicketsMiddleware from './refreshTicketsMiddleware';
import successTicketsMiddleware from './successTicketsMiddleware';

// eslint-disable-next-line import/prefer-default-export
export const ticketsMiddlewares = [
    deleteTicketsMiddleware,
    errorTicketsMiddleware,
    getTicketsMiddleware,
    postTicketsMiddleware,
    refreshTicketsMiddleware,
    successTicketsMiddleware,
];
