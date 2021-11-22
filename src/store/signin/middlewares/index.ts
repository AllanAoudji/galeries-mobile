import errorSigninMiddleware from './errorSigninMiddleware';
import resetSigninMiddleware from './resetSigninMiddleware';
import signinMiddleware from './signinMiddleware';
import successSigninMiddleware from './successSigninMiddleware';

// eslint-disable-next-line import/prefer-default-export
export const signinMiddlewares = [
    errorSigninMiddleware,
    resetSigninMiddleware,
    signinMiddleware,
    successSigninMiddleware,
];
