import { Middleware } from 'redux';

import { API_ERROR } from '#store/api/actionTypes';
import { PROFILE_PICTURES } from '#store/genericActionTypes';

import errorDefaultMethod from './errorDefaultMethod';
import errorDeleteMethod from './errorDeleteMethod';
import errorGetMethod from './errorGetMethod';
import errorPostMethod from './errorPostMethod';

const errorProfilePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${PROFILE_PICTURES} ${API_ERROR}`) return;

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
            default:
                errorDefaultMethod(dispatch);
        }
    };

export default errorProfilePicturesMiddleware;
