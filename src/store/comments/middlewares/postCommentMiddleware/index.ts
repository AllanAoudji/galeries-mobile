import { Middleware } from 'redux';

import { COMMENTS_POST } from '#store/comments/actionTypes';
import { updateCommentsLoadingPost } from '#store/comments/actionCreators';
import {
    dispatchPostCommentComments,
    dispatchPostFrameComments,
} from '#store/dispatchers';

const postCommentMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== COMMENTS_POST) return;

        const loading = getState().comments.loading.post;
        const frameId = action.meta.query
            ? action.meta.query.frameId
            : undefined;
        const commentId = action.meta.query
            ? action.meta.query.commentId
            : undefined;
        if (
            typeof action.payload !== 'object' ||
            typeof action.payload.body !== 'string' ||
            loading.includes('LOADING')
        )
            return;

        if (frameId) {
            const frame = getState().frames.byId[frameId];
            if (!frame) return;

            dispatch(updateCommentsLoadingPost('LOADING'));
            dispatchPostFrameComments(dispatch, frameId, action.payload);
        } else if (commentId) {
            const comment = getState().comments.byId[commentId];
            if (!comment) return;

            dispatch(updateCommentsLoadingPost('LOADING'));
            dispatchPostCommentComments(dispatch, commentId, action.payload);
        }
    };

export default postCommentMiddleware;
