import errorLikesMiddleware from './errorLikesMiddleware';
import getLikesMiddleware from './getLikesMiddleware';
import postLikesMiddleware from './postLikesMiddleware';
import resetLikesMiddleware from './resetLikesMiddleware';
import successLikesMiddleware from './successLikesMiddleware';

// eslint-disable-next-line import/prefer-default-export
export const likesMiddlewares = [
    errorLikesMiddleware,
    getLikesMiddleware,
    postLikesMiddleware,
    resetLikesMiddleware,
    successLikesMiddleware,
];
