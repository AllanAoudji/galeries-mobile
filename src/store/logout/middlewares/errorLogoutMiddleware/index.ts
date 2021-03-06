import { Middleware } from 'redux';

import { API_ERROR } from '#store/api/actionTypes';
import { dispatchErrorNotification } from '#store/dispatchers';
import { LOGOUT } from '#store/genericActionTypes';
import { updateLogoutStatus } from '#store/logout/actionCreators';

const errorLogoutMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${LOGOUT} ${API_ERROR}`) {
            dispatch(updateLogoutStatus('ERROR'));
            dispatchErrorNotification(dispatch, action);
        }
    };

export default errorLogoutMiddleware;
