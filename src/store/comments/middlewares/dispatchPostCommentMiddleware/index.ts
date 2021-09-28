import { Middleware } from 'redux';

import { COMMENTS_POST } from '#store/comments';
import { dispatchPostFrameComments } from '#store/dispatchers';
import { getFrame } from '#store/getters';
import { setLoading } from '#store/loading';

const postCommentMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === COMMENTS_POST) {
            const frameId = action.meta.query
                ? action.meta.query.frameId
                : undefined;
            const body =
                typeof action.payload === 'object'
                    ? action.payload.body
                    : undefined;
            if (frameId && typeof body === 'string') {
                const frame = getFrame(getState, frameId);
                if (frame) {
                    dispatch(setLoading(true));
                    dispatchPostFrameComments(
                        dispatch,
                        frameId,
                        action.payload
                    );
                }
            }
        }
    };

export default postCommentMiddleware;
