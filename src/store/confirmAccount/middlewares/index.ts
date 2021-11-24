import errorConfirmAccountMiddleware from './errorConfirmAccountMiddleware';
import postConfirmAccountMiddleware from './postConfirmAccountMiddleware';
import resetConfirmAccountMiddleware from './resetConfirmAccountMiddleware';
import successConfirmAccountMiddleware from './successConfirmAccountMiddleware';

// eslint-disable-next-line import/prefer-default-export
export const confirmAccountMiddlewares = [
    errorConfirmAccountMiddleware,
    postConfirmAccountMiddleware,
    resetConfirmAccountMiddleware,
    successConfirmAccountMiddleware,
];
