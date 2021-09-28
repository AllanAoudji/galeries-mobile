import { Middleware } from 'redux';

import { LOGOUT } from '#store/genericActionTypes';
import { dispatchLogout } from '#store/dispatchers';
import { getLogoutStatus } from '#store/getters';
import { updateLogoutStatus } from '#store/logout';

const logoutMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === LOGOUT) {
            const status = getLogoutStatus(getState);
            if (!status.includes('LOADING')) {
                dispatch(updateLogoutStatus('LOADING'));
                dispatchLogout(dispatch);
            }
        }
    };

export default logoutMiddleware;
