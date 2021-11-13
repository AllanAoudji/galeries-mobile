import { Middleware } from 'redux';

import { API_SUCCESS } from '#store/api/actionTypes';

import successDefaultMethod from './successDefaultMethod';
import successDeleteMethod from './successDeleteMethod';
import successGetMethod from './successGetMethod';
import { NOTIFICATIONS } from '#store/genericActionTypes';

const successNotificationsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${NOTIFICATIONS} ${API_SUCCESS}`) return;

        switch (action.meta.method) {
            case 'DELETE':
                successDeleteMethod(dispatch, getState, action);
                break;
            case 'GET':
                successGetMethod(action);
                break;
            case 'PUT':
                break;
            default:
                successDefaultMethod(dispatch);
        }
    };

export default successNotificationsMiddleware;
