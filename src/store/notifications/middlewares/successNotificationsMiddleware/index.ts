import { Middleware } from 'redux';

import { API_SUCCESS } from '#store/api/actionTypes';
import { NOTIFICATIONS } from '#store/genericActionTypes';

import successDefaultMethod from './successDefaultMethod';
import successDeleteMethod from './successDeleteMethod';
import successGetMethod from './successGetMethod';
import successPutMethod from './successPutMethod';

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
                successGetMethod(dispatch, getState, action);
                break;
            case 'PUT':
                successPutMethod(dispatch, getState, action);
                break;
            default:
                successDefaultMethod(dispatch);
        }
    };

export default successNotificationsMiddleware;
