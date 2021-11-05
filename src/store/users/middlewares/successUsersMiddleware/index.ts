import { Middleware } from 'redux';

import { API_SUCCESS } from '#store/api/actionTypes';
import { USERS } from '#store/genericActionTypes';

import successDefaultMethod from './successDefaultMethod';
import successDeleteMethod from './successDeleteMethod';
import successGetUsers from './successGetUsers';

const successUsersMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${USERS} ${API_SUCCESS}`) return;

        switch (action.meta.method) {
            case 'DELETE':
                successDeleteMethod(dispatch, getState, action);
                break;
            case 'GET':
                successGetUsers(dispatch, getState, action);
                break;
            default:
                successDefaultMethod(dispatch);
        }
    };

export default successUsersMiddleware;
