import { Middleware } from 'redux';

import {
    resetGalerieRolesById,
    resetGalerieRolesLoadingPut,
} from '#store/galerieRoles/actionCreators';
import { GALERIE_ROLES_RESET } from '#store/galerieRoles/actionTypes';

const resetGalerieRolesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== GALERIE_ROLES_RESET) return;

        dispatch(resetGalerieRolesById());
        dispatch(resetGalerieRolesLoadingPut());
    };

export default resetGalerieRolesMiddleware;
