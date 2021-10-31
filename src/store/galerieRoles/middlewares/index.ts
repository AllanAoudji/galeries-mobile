import putGalerieRolesMiddleware from './putGalerieRolesMiddleware';
import successGalerieRolesMiddleware from './successGalerieRolesMiddleware';

// eslint-disable-next-line import/prefer-default-export
export const galerieRolesMiddlewares = [
    putGalerieRolesMiddleware,
    successGalerieRolesMiddleware,
];
