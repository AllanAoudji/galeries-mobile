import errorLogoutMiddleware from './errorLogoutMiddleware';
import logoutMiddleware from './logoutMiddleware';
import successLogoutMiddleware from './successLogoutMiddleware';

// eslint-disable-next-line import/prefer-default-export
export const logoutMiddlewares = [
    errorLogoutMiddleware,
    logoutMiddleware,
    successLogoutMiddleware,
];
