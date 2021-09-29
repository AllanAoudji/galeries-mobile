import { Middleware } from 'redux';

import { dispatchLogout } from '#store/dispatchers';
import { LOGOUT } from '#store/genericActionTypes';
import { getLogoutStatus } from '#store/getters';
import { updateLogoutStatus } from '#store/logout/actionCreators';

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
