import { Middleware } from 'redux';

import { dispatchLogout } from '#store/dispatchers';
import { LOGOUT } from '#store/genericActionTypes';
import { updateLogoutStatus } from '#store/logout/actionCreators';

const logoutMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === LOGOUT) {
            const { status } = getState().logout;
            if (!status.includes('LOADING')) {
                dispatch(updateLogoutStatus('LOADING'));
                dispatchLogout(dispatch);
            }
        }
    };

export default logoutMiddleware;
