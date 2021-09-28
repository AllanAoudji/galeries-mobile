import { Middleware } from 'redux';

import { LOGIN } from '#store/genericActionTypes';
import { getMeId, getUser } from '#store/getters';
import { dispatchErrorNotification, dispatchLogin } from '#store/dispatchers';
import { getMe } from '#store/me';

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
