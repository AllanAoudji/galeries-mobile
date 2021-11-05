import deleteFramesMiddleware from './deleteFramesMiddleware';
import errorInvitationsMiddleware from './errorInvitationsMiddleware';
import getInvitationsMiddleware from './getInvitationsMiddleware';
import postInvitationsMiddleware from './postInvitationsMiddleware';
import refreshInvitationsMiddleware from './refreshInvitationsMiddleware';
import resetInvitationsMiddleware from './resetInvitationsMiddleware';
import successInvitationsMiddleware from './successInvitationsMiddleware';

// eslint-disable-next-line import/prefer-default-export
export const invitationsMiddlewares = [
    deleteFramesMiddleware,
    errorInvitationsMiddleware,
    getInvitationsMiddleware,
    postInvitationsMiddleware,
    refreshInvitationsMiddleware,
    resetInvitationsMiddleware,
    successInvitationsMiddleware,
];
