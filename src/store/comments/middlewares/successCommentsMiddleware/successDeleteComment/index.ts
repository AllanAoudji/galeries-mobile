import { Dispatch } from 'redux';

import {
    removeCommentsById,
    updateCommentsAllIds,
    updateCommentsLoadingDelete,
} from '#store/comments/actionCreators';
import { updateFramesById } from '#store/frames/actionCreators';

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
    const comment = getState().comments.byId[commentId];
    if (!comment) return;

    const frame = getState().frames.byId[comment.frameId];
    const parentComment = getState().comments.byId[comment.commentId || ''];
    if (parentComment) {
        const allIds = getState().comments.allIds[parentComment.id];
        const newAllIds = allIds.filter((id) => id !== commentId);

        dispatch(updateCommentsAllIds(parentComment.id, newAllIds));
    } else if (frame) {
        const allIds = getState().comments.allIds[frame.id];
        const newAllIds = allIds.filter((id) => id !== commentId);

        dispatch(updateCommentsAllIds(frame.id, newAllIds));
        dispatch(updateFramesById({ ...frame, numOfComments }));
    }
    dispatch(removeCommentsById(commentId));
    dispatch(updateCommentsLoadingDelete('SUCCESS'));
};

export default successDeleteComment;
