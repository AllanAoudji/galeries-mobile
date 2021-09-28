import { Middleware } from 'redux';

import { API_ERROR } from '#store/api';
import {
    dispatchErrorNotification,
    dispatchUpdateFrameComments,
} from '#store/dispatchers';
import { COMMENTS } from '#store/genericActionTypes';
import { getFrame } from '#store/getters';
import { setLoading } from '#store/loading';

const errorCommentsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${COMMENTS} ${API_ERROR}`) {
            const frameId = action.payload.query
                ? action.payload.query.frameId
                : undefined;
            if (frameId) {
                const frame = getFrame(getState, frameId);
                if (frame)
                    dispatchUpdateFrameComments(dispatch, frame, {
                        status: 'ERROR',
                    });
            }
            dispatch(setLoading(false));
            dispatchErrorNotification(dispatch, action);
        }
    };

export default errorCommentsMiddleware;
