import { Dispatch } from 'redux';

import {
    setCommentsById,
    updateCommentsAllIds,
    updateCommentsEnd,
    updateCommentsPrevious,
    updateCommentsStatus,
} from '#store/comments/actionCreators';
import { getUserId } from '#store/users/actionCreators';
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
        if (frameId) dispatch(updateCommentsStatus(frameId, 'ERROR'));
        else if (commentId) dispatch(updateCommentsStatus(commentId, 'ERROR'));
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
        const oldAllIds = getState().comments.allIds[frameId] || [];
        const newAllIds = combineCommentsAllIds(getState, oldAllIds, allIds);
        const previousCommentId = allIds[allIds.length - 1];
        let previous: string | undefined;
        if (previousCommentId)
            previous = byId[previousCommentId].autoIncrementId;

        dispatch(updateCommentsAllIds(frameId, newAllIds));
        dispatch(updateCommentsEnd(frameId, allIds.length < 20));
        if (previous) dispatch(updateCommentsPrevious(frameId, previous));
        dispatch(updateCommentsStatus(frameId, 'SUCCESS'));
    } else if (commentId) {
        const oldAllIds = getState().comments.allIds[commentId] || [];
        const newAllIds = combineCommentsAllIds(getState, oldAllIds, allIds);
        const previousCommentId = allIds[allIds.length - 1];
        let previous: string | undefined;
        if (previousCommentId)
            previous = byId[previousCommentId].autoIncrementId;
        dispatch(updateCommentsAllIds(commentId, newAllIds));
        dispatch(updateCommentsEnd(commentId, allIds.length < 10));
        if (previous) dispatch(updateCommentsPrevious(commentId, previous));
        dispatch(updateCommentsStatus(commentId, 'SUCCESS'));
    }

    allIds.forEach((id) => {
        const user = getState().users.byId[byId[id].userId];
        if (!user) dispatch(getUserId(byId[id].userId));
    });
};

export default successGetComments;
