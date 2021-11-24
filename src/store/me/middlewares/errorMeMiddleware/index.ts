import { Middleware } from 'redux';

import { API_ERROR } from '#store/api/actionTypes';
import { ME } from '#store/genericActionTypes';

import errorDefaultMethod from './errorDefaultMethod';
import errorDeleteMethod from './errorDeleteMethod';
import errorPutMethod from './errorPutMethod';

const errorMeMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type !== `${ME} ${API_ERROR}`) return;

        switch (action.meta.method) {
            case 'DELETE':
                errorDeleteMethod(dispatch, action);
                break;
            case 'PUT':
                errorPutMethod(dispatch, action);
                break;
            default:
                errorDefaultMethod(dispatch);
        }
    };

export default errorMeMiddleware;
