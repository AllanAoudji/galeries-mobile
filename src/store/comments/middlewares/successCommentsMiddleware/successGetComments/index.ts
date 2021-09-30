import { Dispatch } from 'redux';

import { setCommentsById } from '#store/comments/actionCreators';
import { dispatchUpdateFrameComments } from '#store/dispatchers';
import { getFrame, getUser } from '#store/getters';
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
    if (!frameId) return;
    const frame = getFrame(getState, frameId);
    if (!frame) return;

    if (
        typeof action.payload !== 'object' ||
        typeof action.payload.data !== 'object' ||
        (typeof action.payload.data.comment !== 'object' &&
            !Array.isArray(action.payload.data.comments))
    ) {
        dispatchUpdateFrameComments(dispatch, frame, {
            status: 'ERROR',
        });
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

    if (!allIds.length) {
        dispatchUpdateFrameComments(dispatch, frame, {
            status: 'ERROR',
        });
        return;
    }

    const oldAllIds = frame.comments ? frame.comments.allIds : [];
    const newAllIds = combineCommentsAllIds(getState, oldAllIds, allIds);
    const previousCommentId = allIds[allIds.length - 1];
    const previous = byId[previousCommentId].autoIncrementId;

    dispatch(setCommentsById(byId));
    dispatchUpdateFrameComments(dispatch, frame, {
        allIds: newAllIds,
        end: allIds.length < 20,
        previous,
        status: 'SUCCESS',
    });

    allIds.forEach((id) => {
        const user = getUser(getState, byId[id].userId);
        if (!user) dispatch(getUserId(byId[id].userId));
    });
};

export default successGetComments;
