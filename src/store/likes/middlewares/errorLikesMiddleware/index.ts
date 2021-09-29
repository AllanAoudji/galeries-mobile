import { Middleware } from 'redux';

import { API_ERROR } from '#store/api/actionTypes';
import {
    dispatchUpdateFrameLikes,
    dispatchErrorNotification,
} from '#store/dispatchers';
import { LIKES } from '#store/genericActionTypes';
import { getFrame } from '#store/getters';

const errorLikesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${LIKES} ${API_ERROR}`) {
            const frameId = action.payload.query
                ? action.payload.query.frameId
                : undefined;
            if (typeof frameId === 'string') {
                const frame = getFrame(getState, frameId);
                if (frame)
                    dispatchUpdateFrameLikes(dispatch, frame, {
                        status: 'ERROR',
                    });
            }
            dispatchErrorNotification(dispatch, action);
        }
    };

export default errorLikesMiddleware;
