import { Middleware } from 'redux';

import { API_SUCCESS } from '#store/api/actionTypes';
import { REPORTS } from '#store/genericActionTypes';

import successDefaultMethod from './successDefaultMethod';
import successPostMethod from './successPostMethod';

const successReportsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${REPORTS} ${API_SUCCESS}`) return;

        switch (action.meta.method) {
            case 'POST':
                successPostMethod(dispatch, getState, action);
                break;
            default:
                successDefaultMethod(dispatch);
        }
    };

export default successReportsMiddleware;
