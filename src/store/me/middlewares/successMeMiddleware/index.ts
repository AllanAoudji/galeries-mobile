import { Middleware } from 'redux';

import { API_SUCCESS } from '#store/api/actionTypes';
import { ME } from '#store/genericActionTypes';

import successDefaultMethod from './successDefaultMethod';
import successDeleteMethod from './successDeleteMethod';
import successGetMethod from './successGetMethod';
import successPutMethod from './successPutMethod';
import successPostMethod from './successPostMethod';

const successMeMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${ME} ${API_SUCCESS}`) {
            switch (action.meta.method) {
                case 'DELETE':
                    successDeleteMethod(dispatch);
                    break;
                case 'POST':
                    successPostMethod(dispatch, getState, action);
                    break;
                case 'PUT':
                    successPutMethod(dispatch, getState, action);
                    break;
                case 'GET':
                    successGetMethod(dispatch, getState, action);
                    break;
                default:
                    successDefaultMethod(dispatch, action);
            }
        }
    };

export default successMeMiddleware;
