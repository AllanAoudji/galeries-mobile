import errorResetPasswordMiddleware from './errorResetPasswordMiddleware';
import postResetPasswordMiddleware from './postResetPasswordMiddleware';
import resetResetPasswordMiddleware from './resetResetPasswordMiddleware';
import successResetPasswordMiddleware from './successResetPasswordMiddleware';

// eslint-disable-next-line import/prefer-default-export
export const resetPasswordMiddleware = [
    errorResetPasswordMiddleware,
    postResetPasswordMiddleware,
    resetResetPasswordMiddleware,
    successResetPasswordMiddleware,
];
