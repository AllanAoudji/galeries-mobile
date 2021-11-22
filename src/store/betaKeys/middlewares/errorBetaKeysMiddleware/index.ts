import { Middleware } from 'redux';

import { API_ERROR } from '#store/api/actionTypes';
import { BETA_KEYS } from '#store/genericActionTypes';

import errorDefaultMethod from './errorDefaultMethod';
import errorDeleteMethod from './errorDeleteMethod';
import errorGetMethod from './errorGetMethod';
import errorPostMethod from './errorPostMethod';

const errorBetaKeysMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${BETA_KEYS} ${API_ERROR}`) return;

        switch (action.meta.method) {
            case 'DELETE':
                errorDeleteMethod(dispatch, action);
                break;
            case 'GET':
                errorGetMethod(dispatch);
                break;
            case 'POST':
                errorPostMethod(dispatch, action);
                break;
            default:
                errorDefaultMethod(dispatch);
        }
    };

export default errorBetaKeysMiddleware;
