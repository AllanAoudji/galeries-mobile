import { Middleware } from 'redux';

import resetStore from '#store/resetStore';

import { API_SUCCESS } from '#store/api/actionTypes';
import { LOGOUT } from '#store/genericActionTypes';
import { updateLogoutStatus } from '#store/logout/actionCreators';

const successLogoutMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${LOGOUT} ${API_SUCCESS}`) {
            resetStore(dispatch, () => {
                dispatch(updateLogoutStatus('SUCCESS'));
            });
        }
    };

export default successLogoutMiddleware;
