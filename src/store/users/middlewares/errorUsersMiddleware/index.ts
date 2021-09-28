import { Middleware } from 'redux';

import { API_ERROR } from '#store/api';
import {
    dispatchErrorNotification,
    dispatchUpdateGalerieUsers,
} from '#store/dispatchers';
import { USERS } from '#store/genericActionTypes';
import { getGalerie } from '#store/getters';
import { updateUsersStatus } from '#store/users/actionCreators';

const errorUsersMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${USERS} ${API_ERROR}`) {
            const galerieId = action.meta.query
                ? action.meta.query.galerieId
                : undefined;
            if (typeof galerieId === 'string') {
                const galerie = getGalerie(getState, galerieId);
                dispatchUpdateGalerieUsers(dispatch, galerie, {
                    status: 'ERROR',
                });
            } else dispatch(updateUsersStatus('ERROR'));
            dispatchErrorNotification(dispatch, action);
        }
    };

export default errorUsersMiddleware;
