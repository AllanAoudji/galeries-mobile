import { Middleware } from 'redux';

import { API_SUCCESS } from '#store/api/actionTypes';
import { LIKES } from '#store/genericActionTypes';

import successDefaultMethod from './successDefaultMethod';
import successGetLikes from './successGetLikes';
import successPostLikes from './successPostLikes';

const successLikesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${LIKES} ${API_SUCCESS}`) return;

        switch (action.meta.method) {
            case 'GET':
                successGetLikes(dispatch, getState, action);
                break;
            case 'POST':
                successPostLikes(dispatch, getState, action);
                break;
            default:
                successDefaultMethod(dispatch);
                break;
        }
    };

export default successLikesMiddleware;
