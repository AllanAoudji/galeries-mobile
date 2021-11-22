import { Middleware } from 'redux';

import { dispatchErrorNotification, dispatchSignin } from '#store/dispatchers';
import { SIGNIN } from '#store/genericActionTypes';
import { getMe, resetMeId } from '#store/me/actionCreators';
import { updateSigninStatus } from '#store/signin/actionCreators';

const signinMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type !== SIGNIN) return;
        const { status } = getState().signin;
        if (status.includes('LOADING')) return;

        if (typeof action.payload !== 'object') return;
        const { email, userName, password, confirmPassword, betaKey } =
            action.payload;

        if (typeof email !== 'string') return;
        if (typeof userName !== 'string') return;
        if (typeof password !== 'string') return;
        if (typeof confirmPassword !== 'string') return;
        if (typeof betaKey !== 'string') return;

        const meId = getState().me.id;
        if (meId) {
            const me = getState().users.byId[meId];
            if (me)
                dispatchErrorNotification(dispatch, 'you already logged in.');
            else dispatch(getMe());
        } else {
            dispatch(resetMeId());
            dispatch(updateSigninStatus('LOADING'));
            dispatchSignin(dispatch, action.payload);
        }
    };

export default signinMiddleware;
