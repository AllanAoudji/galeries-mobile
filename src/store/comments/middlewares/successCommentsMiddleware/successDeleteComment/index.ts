import { Dispatch } from 'redux';

import {
    removeCommentsById,
    updateCommentsById,
    updateCommentsLoadingDelete,
} from '#store/comments/actionCreators';
import { updateFramesById } from '#store/frames/actionCreators';
import { getComment, getFrame } from '#store/getters';

const successDeleteComment = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (
        typeof action.payload !== 'object' ||
        typeof action.payload.data !== 'object' ||
        typeof action.payload.data.commentId !== 'string' ||
        typeof action.payload.data.numOfComments !== 'number'
    )
        return;
    const { commentId, numOfComments } = action.payload.data;
    const comment = getComment(getState, commentId);
    if (!comment) return;

    const frame = getFrame(getState, comment.frameId);
    const parentComment = getComment(getState, comment.commentId || '');
    if (parentComment) {
        const allIds = parentComment.comments
            ? parentComment.comments.allIds
            : [];
        const newAllIds = allIds.filter((id) => id !== commentId);
        dispatch(
            updateCommentsById({
                ...parentComment,
                comments: {
                    allIds: newAllIds,
                    end: parentComment.comments
                        ? parentComment.comments.end
                        : false,
                    previous: parentComment.comments
                        ? parentComment.comments.previous
                        : undefined,
                    status: parentComment.comments
                        ? parentComment.comments.status
                        : 'PENDING',
                },
            })
        );
    } else if (frame) {
        const allIds = frame.comments ? frame.comments.allIds : [];
        const newAllIds = allIds.filter((id) => id !== commentId);
        dispatch(
            updateFramesById({
                ...frame,
                numOfComments,
                comments: {
                    allIds: newAllIds,
                    end: frame.comments ? frame.comments.end : false,
                    previous: frame.comments
                        ? frame.comments.previous
                        : undefined,
                    status: frame.comments ? frame.comments.status : 'PENDING',
                },
            })
        );
    }
    dispatch(removeCommentsById(commentId));
    dispatch(updateCommentsLoadingDelete('SUCCESS'));
};

export default successDeleteComment;
