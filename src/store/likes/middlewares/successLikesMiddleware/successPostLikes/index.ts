import { Dispatch } from 'redux';
import {
    removeLikesById,
    setLikesAllIds,
    setLikesById,
} from '#store/likes/actionCreators';
import { updateFramesById } from '#store/frames';
import combineLikesAllIds from '#store/combineAllIds/combineLikesAllIds';

const successPostLikes = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const frameId = action.meta.query ? action.meta.query.frameId : undefined;
    if (!frameId) return;
    const frame = getState().frames.byId[frameId];
    if (
        typeof action.payload !== 'object' ||
        typeof action.payload.data !== 'object' ||
        typeof action.payload.data.liked !== 'boolean' ||
        typeof action.payload.data.numOfLikes !== 'number'
    )
        return;

    const { liked, numOfLikes, createdLike } = action.payload.data;

    if (!liked) {
        const meId = getState().me.id;
        const likes = Object.values(getState().likes.byId).filter(
            (like) => like.frameId === frameId && like.userId === meId
        );
        if (likes[0]) {
            dispatch(removeLikesById(likes[0].id));
            const allIds = getState().likes.allIds[frameId];
            if (!allIds.length) {
                allIds.filter((id) => id !== likes[0].id);
                dispatch(setLikesAllIds(frameId, allIds));
            }
        }
    } else {
        if (typeof createdLike !== 'object') return;
        const oldAllIds = getState().likes.allIds[frameId] || [];
        const newAllIds = combineLikesAllIds(getState, oldAllIds, [
            createdLike.id,
        ]);
        dispatch(setLikesById({ [createdLike.id]: createdLike }));
        dispatch(setLikesAllIds(frameId, newAllIds));
    }
    dispatch(updateFramesById({ ...frame, liked, numOfLikes }));
};

export default successPostLikes;
