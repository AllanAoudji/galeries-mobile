import { Dispatch } from 'redux';

import {
    setCommentsById,
    updateCommentsLoadingPost,
} from '#store/comments/actionCreators';
import {
    dispatchUpdateCommentComments,
    dispatchUpdateFrameComments,
} from '#store/dispatchers';
import { getComment, getFrame } from '#store/getters';
import { combineCommentsAllIds } from '#store/combineAllIds';

const successPostComments = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (
        typeof action.payload !== 'object' ||
        typeof action.payload.data !== 'object' ||
        typeof action.payload.data.comment !== 'object'
    ) {
        dispatch(updateCommentsLoadingPost('SUCCESS'));
        return;
    }

    const { comment } = action.payload.data;
    const commentId = action.meta.query
        ? action.meta.query.commentId
        : undefined;
    const frameId = action.meta.query ? action.meta.query.frameId : undefined;
    const byId = { [comment.id]: comment };

    dispatch(setCommentsById(byId));

    if (!frameId && !commentId) {
        dispatch(updateCommentsLoadingPost('ERROR'));
        return;
    }

    if (frameId) {
        const frame = getFrame(getState, frameId);
        if (!frame) {
            dispatch(updateCommentsLoadingPost('ERROR'));
            return;
        }

        const oldAllIds = frame.comments ? frame.comments.allIds : [];
        const newAllIds = combineCommentsAllIds(getState, oldAllIds, [
            comment.id,
        ]);

        dispatchUpdateFrameComments(dispatch, frame, {
            allIds: newAllIds,
        });
    } else if (commentId) {
        const storedComment = getComment(getState, commentId);
        if (!storedComment) {
            dispatch(updateCommentsLoadingPost('ERROR'));
            return;
        }

        const oldsAllIds = storedComment.comments
            ? storedComment.comments.allIds
            : [];
        const newAllIds = combineCommentsAllIds(getState, oldsAllIds, [
            comment.id,
        ]);

        dispatchUpdateCommentComments(dispatch, storedComment, {
            allIds: newAllIds,
        });
    }
    dispatch(updateCommentsLoadingPost('SUCCESS'));
};

export default successPostComments;
