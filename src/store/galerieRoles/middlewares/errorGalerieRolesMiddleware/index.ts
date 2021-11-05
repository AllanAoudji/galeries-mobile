import { Middleware } from 'redux';

import { API_ERROR } from '#store/api';
import { GALERIE_ROLES } from '#store/genericActionTypes';

import errorDefaultMethod from './errorDefaultMethod';
import errorPutRolesMiddleware from './errorPutRolesMiddleware';

const errorGalerieRolesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${GALERIE_ROLES} ${API_ERROR}`) return;

        switch (action.meta.method) {
            case 'PUT':
                errorPutRolesMiddleware(dispatch, action);
                break;
            default:
                errorDefaultMethod(dispatch);
        }
    };

export default errorGalerieRolesMiddleware;
