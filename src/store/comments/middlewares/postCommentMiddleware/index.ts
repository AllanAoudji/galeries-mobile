import { Middleware } from 'redux';

import { COMMENTS_POST } from '#store/comments/actionTypes';
import { updateCommentsLoadingPost } from '#store/comments/actionCreators';
import { dispatchPostFrameComments } from '#store/dispatchers';
import { getCommentsLoadingPost, getFrame } from '#store/getters';

const postCommentMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== COMMENTS_POST) return;
        const loading = getCommentsLoadingPost(getState);
        const frameId = action.meta.query
            ? action.meta.query.frameId
            : undefined;
        if (
            typeof action.payload !== 'object' ||
            typeof action.payload.body !== 'string' ||
            !frameId ||
            loading.includes('LOADING')
        )
            return;

        const frame = getFrame(getState, frameId);
        if (!frame) return;

        dispatch(updateCommentsLoadingPost('LOADING'));
        dispatchPostFrameComments(dispatch, frameId, action.payload);
    };

export default postCommentMiddleware;
