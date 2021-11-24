import { Middleware } from 'redux';

import { API_SUCCESS } from '#store/api/actionTypes';
import { BETA_KEYS } from '#store/genericActionTypes';

import successDefaultMethod from './successDefaultMethod';
import successDeleteMethod from './successDeleteMethod';
import successGetMethod from './successGetMethod';
import successPostMethod from './successPostMethod';

const successBetaKeysMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${BETA_KEYS} ${API_SUCCESS}`) return;

        switch (action.meta.method) {
            case 'DELETE':
                successDeleteMethod(dispatch, getState, action);
                break;
            case 'GET':
                successGetMethod(dispatch, getState, action);
                break;
            case 'POST':
                successPostMethod(dispatch, getState, action);
                break;
            default:
                successDefaultMethod(dispatch);
        }
    };

export default successBetaKeysMiddleware;
