import { Middleware } from 'redux';

import { API_ERROR } from '#store/api/actionTypes';
import { dispatchErrorNotification } from '#store/dispatchers';
import { SIGNIN } from '#store/genericActionTypes';
import {
    updateSigninFieldsError,
    updateSigninStatus,
} from '#store/signin/actionCreators';

const errorSigninMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${SIGNIN} ${API_ERROR}`) return;

        if (
            typeof action.payload === 'object' &&
            (typeof action.payload.betaKey === 'string' ||
                typeof action.payload.confirmPassword === 'string' ||
                typeof action.payload.email === 'string' ||
                typeof action.payload.password === 'string' ||
                typeof action.payload.userName === 'string')
        ) {
            dispatch(updateSigninFieldsError(action.payload));
        } else dispatchErrorNotification(dispatch, action);
        dispatch(updateSigninStatus('ERROR'));
    };

export default errorSigninMiddleware;
