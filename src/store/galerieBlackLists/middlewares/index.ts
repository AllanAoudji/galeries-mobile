import deleteGalerieBlackListsMiddleware from './deleteGalerieBlackListsMiddleware';
import errorGalerieBlackListsMiddleware from './errorGalerieBlackListsMiddleware';
import getGalerieBlackListsMiddleware from './getGalerieBlackListsMiddleware';
import postGalerieBlackListsMiddleware from './postGalerieBlackListsMiddleware';
import resetGalerieBlackListsMiddleware from './resetGalerieBlackListsMiddleware';
import successGalerieBlackListsMiddleware from './successGalerieBlackListsMiddleware';

// eslint-disable-next-line import/prefer-default-export
export const galerieBlackListsMiddlewares = [
    deleteGalerieBlackListsMiddleware,
    errorGalerieBlackListsMiddleware,
    getGalerieBlackListsMiddleware,
    postGalerieBlackListsMiddleware,
    resetGalerieBlackListsMiddleware,
    successGalerieBlackListsMiddleware,
];
