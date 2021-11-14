import { Middleware } from 'redux';

import { COMMENTS_GET } from '#store/comments/actionTypes';
import {
    dispatchGetComment,
    dispatchGetCommentComments,
    dispatchGetFrameComments,
    dispatchGetNotificationComments,
} from '#store/dispatchers';
import { updateCommentsStatus } from '#store/comments/actionCreators';

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
        const notificationId = action.meta.query
            ? action.meta.query.notificationId
            : undefined;

        if (frameId) {
            const end = getState().comments.end[frameId] || false;
            const status = getState().comments.status[frameId] || 'PENDING';
            if (end) return;
            if (status.includes('LOADING')) return;
            if (status === 'REFRESH') return;

            const previous = getState().comments.previous[frameId];
            const newStatus =
                status === 'PENDING' ? 'INITIAL_LOADING' : 'LOADING';

            dispatch(updateCommentsStatus(frameId, newStatus));
            dispatchGetFrameComments(dispatch, frameId, previous);
        } else if (notificationId) {
            const status =
                getState().comments.status[notificationId] || 'PENDING';

            if (status.includes('LOADING')) return;
            if (status === 'REFRESH') return;

            dispatch(updateCommentsStatus(notificationId, 'LOADING'));
            dispatchGetNotificationComments(dispatch, notificationId);
        } else if (commentId) {
            const end = getState().comments.end[commentId] || false;
            const status = getState().comments.status[commentId] || 'PENDING';
            if (end || status.includes('LOADING')) return;

            const previous = getState().comments.previous[commentId];
            const newStatus =
                status === 'PENDING' ? 'INITIAL_LOADING' : 'LOADING';

            dispatch(updateCommentsStatus(commentId, newStatus));
            dispatchGetCommentComments(dispatch, commentId, previous);
        } else if (typeof action.payload === 'string')
            dispatchGetComment(dispatch, action.payload);
    };

export default getCommentsMiddleware;
