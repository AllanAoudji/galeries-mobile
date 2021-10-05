import { Dispatch } from 'redux';

import {
    setCommentsById,
    updateCommentsAllIds,
    updateCommentsById,
    updateCommentsLoadingPost,
} from '#store/comments/actionCreators';
import { updateFramesById } from '#store/frames/actionCreators';
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
        const oldAllIds = getState().comments.allIds[frameId];
        const newAllIds = combineCommentsAllIds(getState, oldAllIds, [
            comment.id,
        ]);
        dispatch(updateCommentsAllIds(frameId, newAllIds));

        if (typeof numOfComments === 'number') {
            const frame = getState().frames.byId[frameId];
            if (frame) dispatch(updateFramesById({ ...frame, numOfComments }));
        }
    } else if (commentId) {
        const oldAllIds = getState().comments.allIds[commentId];
        const newAllIds = combineCommentsAllIds(getState, oldAllIds, [
            comment.id,
        ]);
        dispatch(updateCommentsAllIds(commentId, newAllIds));

        if (typeof numOfComments === 'number') {
            const storedComment = getState().comments.byId[commentId];
            if (storedComment)
                dispatch(
                    updateCommentsById({ ...storedComment, numOfComments })
                );
        }
    }
    dispatch(updateCommentsLoadingPost('SUCCESS'));
};

export default successPostComments;
