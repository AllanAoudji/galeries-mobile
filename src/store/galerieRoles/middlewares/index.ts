import errorGalerieRolesMiddleware from './errorGalerieRolesMiddleware';
import putGalerieRolesMiddleware from './putGalerieRolesMiddleware';
import resetGalerieRolesMiddleware from './resetGalerieRolesMiddleware';
import successGalerieRolesMiddleware from './successGalerieRolesMiddleware';

// eslint-disable-next-line import/prefer-default-export
export const galerieRolesMiddlewares = [
    errorGalerieRolesMiddleware,
    putGalerieRolesMiddleware,
    resetGalerieRolesMiddleware,
    successGalerieRolesMiddleware,
];
