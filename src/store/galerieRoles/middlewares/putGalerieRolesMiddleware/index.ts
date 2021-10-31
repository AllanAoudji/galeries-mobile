import { Middleware } from 'redux';

import { dispatchPutGalerieUserRole } from '#store/dispatchers';
import { updateGalerieRolesLoadingPut } from '#store/galerieRoles';
import { GALERIE_ROLES_PUT } from '#store/galerieRoles/actionTypes';

const putGalerieRolesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== GALERIE_ROLES_PUT) return;

        const userId = action.meta.query ? action.meta.query.userId : undefined;
        const galerieId = action.meta.query
            ? action.meta.query.galerieId
            : undefined;
        const loading = getState().galerieRoles.loading.put;

        if (!userId || !galerieId || loading.includes('LOADING')) return;

        dispatch(updateGalerieRolesLoadingPut('LOADING'));
        dispatchPutGalerieUserRole(dispatch, galerieId, userId);
    };

export default putGalerieRolesMiddleware;
