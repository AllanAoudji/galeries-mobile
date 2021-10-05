import { Middleware } from 'redux';

import { API_SUCCESS } from '#store/api/actionTypes';
import { USERS } from '#store/genericActionTypes';

import successDefaultMethod from './successDefaultMethod';
import successGetUsers from './successGetUsers';

const successUsersMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${USERS} ${API_SUCCESS}`) return;

        switch (action.meta.method) {
            case 'GET':
                successGetUsers(dispatch, getState, action);
                break;
            default:
                successDefaultMethod(dispatch);
        }
    };

export default successUsersMiddleware;
