import { Middleware } from 'redux';

import { LOGIN } from '#store/genericActionTypes';
import { getMeId, getUser } from '#store/getters';
import { dispatchErrorNotification, dispatchLogin } from '#store/dispatchers';
import { getMe } from '#store/me';
import { setLoading } from '#store/loading';

const loginMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (
            typeof action.payload === 'object' &&
            typeof action.payload.password === 'string' &&
            typeof action.payload.userNameOrEmail &&
            action.type === LOGIN
        ) {
            const meId = getMeId(getState);
            dispatch(setLoading(true));
            if (meId) {
                const user = getUser(getState, meId);
                if (user)
                    // TODO: Error in constants
                    dispatchErrorNotification(
                        dispatch,
                        'you already logged in.'
                    );
                else dispatch(getMe());
            } else dispatchLogin(dispatch, action.payload);
        }
    };

export default loginMiddleware;
