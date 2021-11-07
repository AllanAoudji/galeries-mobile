import { Middleware } from 'redux';

import { dispatchRefreshFrameComments } from '#store/dispatchers';
import { updateCommentsStatus } from '#store/comments/actionCreators';
import { COMMENTS_REFRESH } from '#store/comments/actionTypes';

const refreshCommentsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== COMMENTS_REFRESH) return;
        console.log(action);

        const frameId = action.meta.query
            ? action.meta.query.frameId
            : undefined;

        if (frameId) {
            const status = getState().comments.status[frameId];
            if (status.includes('LOADING')) return;
            if (status === 'REFRESH') return;

            dispatch(updateCommentsStatus(frameId, 'REFRESH'));
            dispatchRefreshFrameComments(dispatch, frameId);
        }
    };

export default refreshCommentsMiddleware;
