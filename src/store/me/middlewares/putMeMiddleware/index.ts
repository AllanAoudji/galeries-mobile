import { Middleware } from 'redux';

import {
    dispatchPutUsersMeHasNewNotifications,
    dispatchPutPseudonym,
} from '#store/dispatchers';
import { ME_PUT } from '#store/me/actionTypes';
import { updateMeLoadingPut } from '#store/me/actionCreators';

const putMeMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== ME_PUT) return;

        if (typeof action.payload !== 'object') return;

        if (action.payload.hasNewNotifications)
            dispatchPutUsersMeHasNewNotifications(dispatch);
        else if (action.payload.pseudonym) {
            dispatch(updateMeLoadingPut('LOADING'));
            dispatchPutPseudonym(dispatch, action.payload);
        }
    };

export default putMeMiddleware;
