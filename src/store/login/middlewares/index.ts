import errorLoginMiddleware from './errorLoginMiddleware';
import loginMiddleware from './loginMiddleware';
import resetLoginMiddleware from './resetLoginMiddleware';
import successLoginMiddleware from './successLoginMiddleware';

// eslint-disable-next-line import/prefer-default-export
export const loginMiddlewares = [
    errorLoginMiddleware,
    loginMiddleware,
    resetLoginMiddleware,
    successLoginMiddleware,
];
