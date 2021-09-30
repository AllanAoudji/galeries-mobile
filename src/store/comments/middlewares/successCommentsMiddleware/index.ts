import { Middleware } from 'redux';

import { API_SUCCESS } from '#store/api/actionTypes';
import { COMMENTS } from '#store/genericActionTypes';

import successDefaultMethod from './successDefaultMethod';
import successDeleteComment from './successDeleteComment';
import successGetComments from './successGetComments';
import successPostComments from './successPostComments';

const successCommentsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${COMMENTS} ${API_SUCCESS}`) return;

        switch (action.meta.method) {
            case 'DELETE':
                successDeleteComment(dispatch, getState, action);
                break;
            case 'GET':
                successGetComments(dispatch, getState, action);
                break;
            case 'POST':
                successPostComments(dispatch, getState, action);
                break;
            default:
                successDefaultMethod(dispatch);
        }
    };

export default successCommentsMiddleware;
