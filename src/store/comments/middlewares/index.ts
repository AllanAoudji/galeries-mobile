import deleteCommentsMiddleware from './deleteCommentsMiddleware';
import errorCommentsMiddleware from './errorCommentsMiddleware';
import getCommentsMiddleware from './getCommentsMiddleware';
import postCommentMiddleware from './postCommentMiddleware';
import refreshCommentsMiddleware from './refreshCommentsMiddleware';
import resetCommentsMiddleware from './resetCommentsMiddleware';
import successCommentsMiddleware from './successCommentsMiddleware';

// eslint-disable-next-line import/prefer-default-export
export const commentsMiddlewares = [
    deleteCommentsMiddleware,
    errorCommentsMiddleware,
    getCommentsMiddleware,
    postCommentMiddleware,
    refreshCommentsMiddleware,
    resetCommentsMiddleware,
    successCommentsMiddleware,
];
