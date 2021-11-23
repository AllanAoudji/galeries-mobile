import errorSendBetaKeyMiddleware from './errorSendBetaKeyMiddleware';
import postSendBetaKeyMiddleware from './postSendBetaKeyMiddleware';
import resetSendBetaKeyMiddleware from './resetSendBetaKeyMiddleware';
import successSendBetaKeyMiddleware from './successSendBetaKeyMiddleware';

// eslint-disable-next-line import/prefer-default-export
export const sendBetaKeyMiddlewares = [
    errorSendBetaKeyMiddleware,
    postSendBetaKeyMiddleware,
    resetSendBetaKeyMiddleware,
    successSendBetaKeyMiddleware,
];
