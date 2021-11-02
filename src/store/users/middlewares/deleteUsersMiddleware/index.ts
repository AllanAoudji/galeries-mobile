import { Middleware } from 'redux';

import { updateUsersLoadingDelete } from '#store/users/actionCreators';
import { USERS_DELETE } from '#store/users/actionTypes';
import { dispatchDeleteGalerieUser } from '#store/dispatchers';

const deleteUsersMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== USERS_DELETE) return;
        if (typeof action.payload !== 'string') return;

        const galerieId = action.meta.query
            ? action.meta.query.galerieId
            : undefined;
        if (!galerieId) return;

        const loading = getState().users.loading.delete;
        if (loading.includes('LOADING')) return;

        dispatch(updateUsersLoadingDelete('LOADING'));
        dispatchDeleteGalerieUser(dispatch, galerieId, action.payload);
    };

export default deleteUsersMiddleware;
