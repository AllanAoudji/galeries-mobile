import { Dispatch } from 'redux';

import {
    setCommentsById,
    updateCommentsLoadingPost,
} from '#store/comments/actionCreators';
import { dispatchUpdateFrameComments } from '#store/dispatchers';
import { getFrame } from '#store/getters';
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
    const frameId = action.meta.query ? action.meta.query.frameId : undefined;
    const byId = { [comment.id]: comment };

    dispatch(setCommentsById(byId));

    if (!frameId) {
        dispatch(updateCommentsLoadingPost('SUCCESS'));
        return;
    }
    const frame = getFrame(getState, frameId);
    if (!frame) {
        dispatch(updateCommentsLoadingPost('SUCCESS'));
        return;
    }

    const oldAllIds = frame.comments ? frame.comments.allIds : [];
    const newAllIds = combineCommentsAllIds(getState, oldAllIds, [comment.id]);

    dispatchUpdateFrameComments(dispatch, frame, {
        allIds: newAllIds,
    });
    dispatch(updateCommentsLoadingPost('SUCCESS'));
};

export default successPostComments;
