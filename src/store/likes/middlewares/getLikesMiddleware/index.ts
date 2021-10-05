import { Middleware } from 'redux';

import { dispatchGetFrameLikes, dispatchGetLike } from '#store/dispatchers';
import { setLikesStatus } from '#store/likes/actionCreators';
import { LIKES_GET } from '#store/likes/actionTypes';

const getLikesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== LIKES_GET) return;

        const frameId = action.meta.query
            ? action.meta.query.frameId
            : undefined;

        if (frameId) {
            const end = getState().likes.end[frameId] || false;
            const status = getState().likes.status[frameId] || 'PENDING';

            if (end || status.includes('LOADING')) return;

            const previous = getState().likes.previous[frameId];
            const newStatus =
                status === 'PENDING' ? 'INITIAL_LOADING' : 'LOADING';

            dispatch(setLikesStatus(frameId, newStatus));
            dispatchGetFrameLikes(dispatch, frameId, previous);
        } else if (action.payload === 'string')
            dispatchGetLike(dispatch, action.payload);
    };

export default getLikesMiddleware;
