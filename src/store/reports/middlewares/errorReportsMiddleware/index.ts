import { Middleware } from 'redux';

import { API_ERROR } from '#store/api/actionTypes';
import { REPORTS } from '#store/genericActionTypes';

import errorDefaultMethod from './errorDefaultMethod';
import errorPostMethod from './errorPostMethod';

const errorReportsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${REPORTS} ${API_ERROR}`) return;

        switch (action.meta.method) {
            case 'POST':
                errorPostMethod(dispatch, action);
                break;
            default:
                errorDefaultMethod(dispatch);
        }
    };

export default errorReportsMiddleware;
