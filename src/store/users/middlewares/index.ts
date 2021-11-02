import deleteUsersMiddleware from './deleteUsersMiddleware';
import errorUsersMiddleware from './errorUsersMiddleware';
import getUsersMiddleware from './getUsersMiddleware';
import resetUsersMiddleware from './resetUsersMiddleware';
import successUsersMiddleware from './successUsersMiddleware';

// eslint-disable-next-line import/prefer-default-export
export const usersMiddleware = [
    deleteUsersMiddleware,
    errorUsersMiddleware,
    getUsersMiddleware,
    resetUsersMiddleware,
    successUsersMiddleware,
];
