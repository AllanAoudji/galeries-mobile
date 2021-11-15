import errorMeMiddleware from './errorMeMiddleware';
import getMeMiddleware from './getMeMiddleware';
import putMeMiddleware from './putMeMiddleware';
import resetMeMiddleware from './resetMeMiddleware';
import successMeMiddleware from './successMeMiddleware';

// eslint-disable-next-line import/prefer-default-export
export const meMiddlewares = [
    errorMeMiddleware,
    getMeMiddleware,
    putMeMiddleware,
    resetMeMiddleware,
    successMeMiddleware,
];
