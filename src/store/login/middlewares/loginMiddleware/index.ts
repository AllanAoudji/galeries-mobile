import { Middleware } from 'redux';

import { dispatchErrorNotification, dispatchLogin } from '#store/dispatchers';
import { LOGIN } from '#store/genericActionTypes';
import { getMe, resetMeId } from '#store/me/actionCreators';
import { updateLoginStatus } from '#store/login/actionCreators';

const loginMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === LOGIN) {
            const loginStatus = getState().login.status;
            if (
                typeof action.payload === 'object' &&
                typeof action.payload.password === 'string' &&
                typeof action.payload.userNameOrEmail &&
                !loginStatus.includes('LOADING')
            ) {
                const meId = getState().me.id;
                if (meId) {
                    const me = getState().users.byId[meId];
                    if (me)
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
