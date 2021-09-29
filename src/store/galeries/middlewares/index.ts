import deleteGaleriesMiddleware from './deleteGaleriesMiddleware';
import errorGaleriesMiddleware from './errorGaleriesMiddleware';
import getGaleriesMiddleware from './getGaleriesMiddleware';
import postGaleriesMiddleware from './postGaleriesMiddleware';
import putGaleriesMiddleware from './putGaleriesMiddleware';
import resetGaleriesMiddleware from './resetGaleriesMiddleware';
import successGaleriesMiddleware from './successGaleriesMiddleware';

// eslint-disable-next-line import/prefer-default-export
export const galeriesMiddleware = [
    deleteGaleriesMiddleware,
    errorGaleriesMiddleware,
    getGaleriesMiddleware,
    postGaleriesMiddleware,
    putGaleriesMiddleware,
    resetGaleriesMiddleware,
    successGaleriesMiddleware,
];
