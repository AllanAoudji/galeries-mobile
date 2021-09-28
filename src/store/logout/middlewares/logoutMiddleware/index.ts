import { Middleware } from 'redux';

import { LOGOUT } from '#store/genericActionTypes';
import { setLoading } from '#store/loading';
import { dispatchLogout } from '#store/dispatchers';

const logoutMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === LOGOUT) {
            dispatch(setLoading(true));
            dispatchLogout(dispatch);
        }
    };

export default logoutMiddleware;
