import { Middleware } from 'redux';

import { dispatchRefetchFrameLikes } from '#store/dispatchers';
import { updateLikesStatus } from '#store/likes/actionCreators';
import { LIKES_REFRESH } from '#store/likes/actionTypes';

const refreshLikesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== LIKES_REFRESH) return;

        const frameId = action.meta.query
            ? action.meta.query.frameId
            : undefined;
        if (!frameId) return;

        const status = getState().likes.status[frameId];
        if (status.includes('LOADING')) return;
        if (status === 'REFRESH') return;

        dispatch(updateLikesStatus(frameId, 'REFRESH'));
        dispatchRefetchFrameLikes(dispatch, frameId);
    };

export default refreshLikesMiddleware;
