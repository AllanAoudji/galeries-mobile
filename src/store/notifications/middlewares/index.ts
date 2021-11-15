import deleteNotificationsMiddleware from './deleteNotificationsMiddleware';
import errorNotificationsMiddleware from './errorNotificationsMiddleware';
import getNotificationsMiddleware from './getNotificationsMiddleware';
import putNotificationsMiddleware from './putNotificationsMiddleware';
import refreshNotificationsMiddleware from './refreshNotificationsMiddleware';
import resetNotificationsMiddleware from './resetNotificationsMiddleware';
import successNotificationsMiddleware from './successNotificationsMiddleware';

// eslint-disable-next-line import/prefer-default-export
export const notificationsMiddleware = [
    deleteNotificationsMiddleware,
    errorNotificationsMiddleware,
    getNotificationsMiddleware,
    putNotificationsMiddleware,
    refreshNotificationsMiddleware,
    resetNotificationsMiddleware,
    successNotificationsMiddleware,
];
