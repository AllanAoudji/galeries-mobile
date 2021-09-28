import { Middleware } from 'redux';

import {
    dispatchGetFrameLikes,
    dispatchGetLike,
    dispatchUpdateFrameLikes,
} from '#store/dispatchers';
import { getFrame } from '#store/getters';
import { LIKES_GET } from '#store/likes';

const getLikesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === LIKES_GET) {
            const frameId = action.meta.query
                ? action.meta.query.frameId
                : undefined;
            if (frameId) {
                const frame = getFrame(getState, frameId);
                if (frame) {
                    const end = frame.likes ? frame.likes.end : false;
                    const previous = frame.likes
                        ? frame.likes.previous
                        : undefined;
                    const status = frame.likes ? frame.likes.status : 'PENDING';
                    if (!end && !status.includes('LOADING')) {
                        const newStatus =
                            status === 'PENDING'
                                ? 'INITIAL_LOADING'
                                : 'LOADING';
                        dispatchUpdateFrameLikes(dispatch, frame, {
                            status: newStatus,
                        });
                        dispatchGetFrameLikes(dispatch, frameId, previous);
                    }
                }
            } else if (action.payload === 'string')
                dispatchGetLike(dispatch, action.payload);
        }
    };

export default getLikesMiddleware;
