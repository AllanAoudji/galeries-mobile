import { Middleware } from 'redux';

import { API_ERROR } from '#store/api/actionTypes';
import { dispatchErrorNotification } from '#store/dispatchers';
import { USERS } from '#store/genericActionTypes';

import errorDefaultMethod from './errorDefaultMethod';
import errorDeleteMethod from './errorDeleteMethod';
import errorGetMethod from './errorGetMethod';

const errorUsersMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${USERS} ${API_ERROR}`) return;

        switch (action.meta.method) {
            case 'DELETE':
                errorDeleteMethod(dispatch, action);
                break;
            case 'GET':
                errorGetMethod(dispatch, action);
                break;
            default:
                errorDefaultMethod(dispatch);
        }

        dispatchErrorNotification(dispatch, action);
    };

export default errorUsersMiddleware;
