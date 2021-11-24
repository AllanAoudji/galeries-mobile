import deleteBetaKeysMiddleware from './deleteBetaKeysMiddleware';
import errorBetaKeysMiddleware from './errorBetaKeysMiddleware';
import getBetaKeysMiddleware from './getBetaKeysMiddleware';
import postBetaKeysMiddleware from './postBetaKeysMiddleware';
import refreshBetaKeysMiddleware from './refreshBetaKeysMiddleware';
import resetBetaKeysMiddleware from './resetBetaKeysMiddleware';
import successBetaKeysMiddleware from './successBetaKeysMiddleware';

// eslint-disable-next-line import/prefer-default-export
export const betaKeysMiddleware = [
    deleteBetaKeysMiddleware,
    errorBetaKeysMiddleware,
    getBetaKeysMiddleware,
    postBetaKeysMiddleware,
    refreshBetaKeysMiddleware,
    resetBetaKeysMiddleware,
    successBetaKeysMiddleware,
];
