import { Dispatch } from 'redux';

import {
    removeCommentsById,
    updateCommentsLoadingDelete,
} from '#store/comments/actionCreators';
import { dispatchDeleteFrameComment } from '#store/dispatchers';
import { getComment, getFrame } from '#store/getters';

const successDeleteComment = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (
        typeof action.payload !== 'object' ||
        typeof action.payload.data !== 'object' ||
        typeof action.payload.data.commentId !== 'string'
    )
        return;
    const { commentId } = action.payload.data;
    const comment = getComment(getState, commentId);
    if (!comment) return;
    const frame = getFrame(getState, comment.frameId);
    if (!frame) return;

    dispatchDeleteFrameComment(dispatch, frame, commentId);
    dispatch(removeCommentsById(commentId));
    dispatch(updateCommentsLoadingDelete('SUCCESS'));
};

export default successDeleteComment;
