import { Middleware } from 'redux';

import { API_SUCCESS } from '#store/api/actionTypes';
import { FRAMES } from '#store/genericActionTypes';

import successDefaultMethod from './successDefaultMethod';
import successDeleteFrame from './successDeleteFrame';
import successGetFrames from './successGetFrames';
import successPostFrames from './successPostFrames';
import successPutFrame from './successPutFrame';

const successFramesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${FRAMES} ${API_SUCCESS}`) return;

        switch (action.meta.method) {
            case 'DELETE':
                successDeleteFrame(dispatch, getState, action);
                break;
            case 'GET':
                successGetFrames(dispatch, getState, action);
                break;
            case 'POST':
                successPostFrames(dispatch, getState, action);
                break;
            case 'PUT':
                successPutFrame(dispatch, getState, action);
                break;
            default:
                successDefaultMethod(dispatch);
        }
    };

export default successFramesMiddleware;
