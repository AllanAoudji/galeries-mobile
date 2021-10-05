import { Middleware } from 'redux';

import { dispatchPostLike } from '#store/dispatchers';
import { LIKES_POST } from '#store/likes/actionTypes';

const postLikesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== LIKES_POST) return;
        const frameId = action.meta.query
            ? action.meta.query.frameId
            : undefined;
        if (typeof frameId !== 'string') return;
        const frame = getState().frames.byId[frameId];
        if (!frame) return;

        dispatchPostLike(dispatch, frameId);
    };

export default postLikesMiddleware;
