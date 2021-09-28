import errorMeMiddleware from './errorMeMiddleware';
import getMeMiddleware from './getMeMiddleware';
import resetMeMiddleware from './resetMeMiddleware';
import successMeMiddleware from './successMeMiddleware';

// eslint-disable-next-line import/prefer-default-export
export const meMiddlewares = [
    errorMeMiddleware,
    getMeMiddleware,
    resetMeMiddleware,
    successMeMiddleware,
];
