import { Middleware } from 'redux';

import { LOGIN } from '#store/genericActionTypes';
import { getLoginStatus, getMeId, getUser } from '#store/getters';
import { dispatchErrorNotification, dispatchLogin } from '#store/dispatchers';
import { getMe, resetMeId } from '#store/me';
import { updateLoginStatus } from '#store/login';

const loginMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === LOGIN) {
            const loginStatus = getLoginStatus(getState);
            if (
                typeof action.payload === 'object' &&
                typeof action.payload.password === 'string' &&
                typeof action.payload.userNameOrEmail &&
                !loginStatus.includes('LOADING')
            ) {
                const meId = getMeId(getState);
                if (meId) {
                    const user = getUser(getState, meId);
                    if (user)
                        dispatchErrorNotification(
                            dispatch,
                            'you already logged in.'
                        );
                    else dispatch(getMe());
                } else {
                    dispatch(resetMeId());
                    dispatch(updateLoginStatus('LOADING'));
                    dispatchLogin(dispatch, action.payload);
                }
            }
        }
    };

export default loginMiddleware;
