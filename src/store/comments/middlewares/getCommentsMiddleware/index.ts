import { Middleware } from 'redux';

import { COMMENTS_GET } from '#store/comments/actionTypes';
import {
    dispatchGetComment,
    dispatchGetCommentComments,
    dispatchGetFrameComments,
    dispatchUpdateCommentComments,
    dispatchUpdateFrameComments,
} from '#store/dispatchers';
import { getComment, getFrame } from '#store/getters';

const getCommentsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== COMMENTS_GET) return;

        const frameId = action.meta.query
            ? action.meta.query.frameId
            : undefined;
        const commentId = action.meta.query
            ? action.meta.query.commentId
            : undefined;

        if (frameId) {
            const frame = getFrame(getState, frameId);
            if (!frame) return;

            const end = frame.comments ? frame.comments.end : false;
            const status = frame.comments ? frame.comments.status : 'PENDING';
            if (end || status.includes('LOADING')) return;

            const previous = frame.comments ? frame.comments.previous : '';
            const newStatus =
                status === 'PENDING' ? 'INITIAL_LOADING' : 'LOADING';

            dispatchUpdateFrameComments(dispatch, frame, {
                status: newStatus,
            });
            dispatchGetFrameComments(dispatch, frameId, previous);
        } else if (commentId) {
            const comment = getComment(getState, commentId);
            if (!comment) return;

            const end = comment.comments ? comment.comments.end : false;
            const status = comment.comments
                ? comment.comments.status
                : 'PENDING';

            if (end || status.includes('LOADING')) return;

            const previous = comment.comments
                ? comment.comments.previous
                : undefined;

            dispatchUpdateCommentComments(dispatch, comment, {
                status: 'LOADING',
            });
            dispatchGetCommentComments(dispatch, commentId, previous);
        } else if (typeof action.payload === 'string')
            dispatchGetComment(dispatch, action.payload);
    };

export default getCommentsMiddleware;
