import { Dispatch } from 'redux';

import { setCommentsById } from '#store/comments/actionCreators';
import {
    dispatchUpdateCommentComments,
    dispatchUpdateFrameComments,
} from '#store/dispatchers';
import { getComment, getFrame, getUser } from '#store/getters';
import { getUserId } from '#store/users';
import { combineCommentsAllIds } from '#store/combineAllIds';

const successGetComments = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const allIds: string[] = [];
    const byId: { [key: string]: Store.Models.Comment } = {};
    const frameId = action.meta.query ? action.meta.query.frameId : undefined;
    const commentId = action.meta.query
        ? action.meta.query.commentId
        : undefined;

    if (!frameId && !commentId) return;

    if (
        typeof action.payload !== 'object' ||
        typeof action.payload.data !== 'object' ||
        (typeof action.payload.data.comment !== 'object' &&
            !Array.isArray(action.payload.data.comments))
    ) {
        if (frameId) {
            const frame = getFrame(getState, frameId);
            if (!frame) return;
            dispatchUpdateFrameComments(dispatch, frame, {
                status: 'ERROR',
            });
        } else if (commentId) {
            const comment = getComment(getState, commentId);
            if (!comment) return;
            dispatchUpdateCommentComments(dispatch, comment, {
                status: 'ERROR',
            });
        }
        return;
    }

    const { comment, comments } = action.payload.data;
    if (comments && Array.isArray(comments))
        comments.forEach((c) => {
            allIds.push(c.id);
            byId[c.id] = c;
        });
    else if (comment && typeof comment === 'object') {
        allIds.push(comment.id);
        byId[comment.id] = comment;
    }

    dispatch(setCommentsById(byId));

    if (frameId) {
        const frame = getFrame(getState, frameId);
        if (!frame) return;

        const oldAllIds = frame.comments ? frame.comments.allIds : [];
        const newAllIds = combineCommentsAllIds(getState, oldAllIds, allIds);
        const previousCommentId = allIds[allIds.length - 1];
        let previous: string | undefined;
        if (previousCommentId)
            previous = byId[previousCommentId].autoIncrementId;

        dispatchUpdateFrameComments(dispatch, frame, {
            allIds: newAllIds,
            end: allIds.length < 20,
            previous,
            status: 'SUCCESS',
        });
    } else if (commentId) {
        const storedComment = getComment(getState, commentId);
        if (!storedComment) return;

        const oldAllIds = storedComment.comments
            ? storedComment.comments.allIds
            : [];
        const newAllIds = combineCommentsAllIds(getState, oldAllIds, allIds);
        const previousCommentId = allIds[allIds.length - 1];
        let previous: string | undefined;
        if (previousCommentId)
            previous = byId[previousCommentId].autoIncrementId;

        dispatchUpdateCommentComments(dispatch, storedComment, {
            allIds: newAllIds,
            end: allIds.length < 10,
            previous,
            status: 'SUCCESS',
        });
    }

    allIds.forEach((id) => {
        const user = getUser(getState, byId[id].userId);
        if (!user) dispatch(getUserId(byId[id].userId));
    });
};

export default successGetComments;
