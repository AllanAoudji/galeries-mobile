import { Dispatch } from 'redux';

import {
    setCommentsById,
    updateCommentsById,
    updateCommentsLoadingPost,
} from '#store/comments/actionCreators';
import { updateFramesById } from '#store/frames/actionCreators';
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

    const { comment, numOfComments } = action.payload.data;
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

        if (typeof numOfComments === 'number')
            dispatch(
                updateFramesById({
                    ...frame,
                    numOfComments,
                    comments: {
                        allIds: newAllIds,
                        end: frame.comments ? frame.comments.end : false,
                        status: frame.comments
                            ? frame.comments.status
                            : 'PENDING',
                        previous: frame.comments
                            ? frame.comments.previous
                            : comment.id,
                    },
                })
            );
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

        if (typeof numOfComments === 'number')
            dispatch(
                updateCommentsById({
                    ...storedComment,
                    numOfComments,
                    comments: {
                        allIds: newAllIds,
                        end: numOfComments <= newAllIds.length,
                        status: storedComment.comments
                            ? storedComment.comments.status
                            : 'PENDING',
                        previous: storedComment.comments
                            ? storedComment.comments.previous
                            : comment.id,
                    },
                })
            );
    }
    dispatch(updateCommentsLoadingPost('SUCCESS'));
};

export default successPostComments;
