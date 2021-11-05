import { Middleware } from 'redux';

import { API_SUCCESS } from '#store/api';
import { GALERIE_ROLES } from '#store/genericActionTypes';

import successDefaultMethod from './successDefaultMethod';
import successPutGalerieRole from './successPutGalerieRole';

const successGalerieRoleMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${GALERIE_ROLES} ${API_SUCCESS}`) return;

        switch (action.meta.method) {
            case 'PUT':
                successPutGalerieRole(dispatch, getState, action);
                break;
            default:
                successDefaultMethod(dispatch);
        }
    };

export default successGalerieRoleMiddleware;
