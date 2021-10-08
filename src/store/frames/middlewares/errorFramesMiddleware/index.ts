import { Middleware } from 'redux';

import { API_ERROR } from '#store/api/actionTypes';
import { FRAMES } from '#store/genericActionTypes';

import errorDefaultMethod from './errorDefaultMethod';
import errorDeleteMethod from './errorDeleteMethod';
import errorGetMethod from './errorGetMethod';
import errorPostMethod from './errorPostMethod';
import errorPutMethod from './errorPutMethod';

const errorFramesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${FRAMES} ${API_ERROR}`) return;

        switch (action.meta.method) {
            case 'DELETE':
                errorDeleteMethod(dispatch, action);
                break;
            case 'GET':
                errorGetMethod(dispatch, getState, action);
                break;
            case 'POST':
                errorPostMethod(dispatch, action);
                break;
            case 'PUT':
                errorPutMethod(dispatch, action);
                break;
            default:
                errorDefaultMethod(dispatch);
        }
    };

export default errorFramesMiddleware;