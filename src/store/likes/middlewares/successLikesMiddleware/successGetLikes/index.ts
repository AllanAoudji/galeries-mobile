import { Dispatch } from 'redux';

import {
    setLikesAllIds,
    setLikesById,
    setLikesEnd,
    setLikesPrevious,
    setLikesStatus,
} from '#store/likes/actionCreators';
import combineLikesAllIds from '#store/combineAllIds/combineLikesAllIds';

const successGetLikes = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const frameId = action.meta.query ? action.meta.query.frameId : undefined;
    if (!frameId) return;

    const allIds: string[] = [];
    const byId: { [key: string]: Store.Models.Like } = {};
    const { likes } = action.payload.data;

    if (!Array.isArray(likes)) return;

    likes.forEach((like) => {
        allIds.push(like.id);
        byId[like.id] = like;
    });

    if (!allIds.length) return;

    dispatch(setLikesById(byId));

    const oldAllIds = getState().likes.allIds[frameId] || [];
    const newAllIds = combineLikesAllIds(getState, oldAllIds, allIds);
    const previousLikeId = allIds[allIds.length - 1];
    const previous = byId[previousLikeId].autoIncrementId;

    dispatch(setLikesAllIds(frameId, newAllIds));
    dispatch(setLikesEnd(frameId, allIds.length < 20));
    dispatch(setLikesPrevious(frameId, previous));
    dispatch(setLikesStatus(frameId, 'SUCCESS'));
};

export default successGetLikes;