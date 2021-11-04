import { Dispatch } from 'redux';

import {
    setLikesAllIds,
    setLikesById,
    setLikesEnd,
    setLikesPrevious,
    updateLikesStatus,
} from '#store/likes/actionCreators';
import { combineLikesAllIds } from '#store/combineAllIds';
import { getUserId } from '#store/users';

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

    let oldAllIds: string[];
    if (action.meta.refresh) oldAllIds = [];
    else oldAllIds = getState().likes.allIds[frameId] || [];
    const newAllIds = combineLikesAllIds(getState, oldAllIds, allIds);
    const previousLikeId =
        allIds.length > 0 ? allIds[allIds.length - 1] : undefined;
    const previous = previousLikeId
        ? byId[previousLikeId].autoIncrementId
        : undefined;

    dispatch(setLikesAllIds(frameId, newAllIds));
    dispatch(setLikesEnd(frameId, allIds.length < 20));
    if (previous) dispatch(setLikesPrevious(frameId, previous));
    dispatch(updateLikesStatus(frameId, 'SUCCESS'));

    allIds.forEach((id) => {
        const user = getState().users.byId[byId[id].userId];

        if (!user) dispatch(getUserId(byId[id].userId));
    });
};

export default successGetLikes;
