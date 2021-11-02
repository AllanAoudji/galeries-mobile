import deleteFramesMiddleware from './deleteFramesMiddleware';
import errorFramesMiddleware from './errorFramesMiddleware';
import getFramesMiddleware from './getFramesMiddleware';
import postFramesMiddleware from './postFramesMiddleware';
import putFrameMiddleware from './putFramesMiddleware';
import refreshFramesMiddleware from './refreshFramesMiddleware';
import resetFramesMiddleware from './resetFramesMiddleware';
import successFramesMiddleware from './successFramesMiddleware';

// eslint-disable-next-line import/prefer-default-export
export const framesMiddlewares = [
    deleteFramesMiddleware,
    errorFramesMiddleware,
    getFramesMiddleware,
    postFramesMiddleware,
    putFrameMiddleware,
    refreshFramesMiddleware,
    resetFramesMiddleware,
    successFramesMiddleware,
];
