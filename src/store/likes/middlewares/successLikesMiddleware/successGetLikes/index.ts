import { Dispatch } from 'redux';

import { getFrame } from '#store/getters';
import { setLikesById } from '#store/likes/actionCreators';
import { dispatchUpdateFrameLikes } from '#store/dispatchers';

const successGetLikes = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const frameId = action.meta.query ? action.meta.query.frameId : undefined;
    if (!frameId) return;
    const frame = getFrame(getState, frameId);
    if (!frame) return;

    const allIds: string[] = [];
    const byId: { [key: string]: Store.Models.Like } = {};
    const { likes } = action.payload.data;
    if (likes && Array.isArray(likes))
        likes.forEach((l) => {
            allIds.push(l.id);
            byId[l.id] = l;
        });
    dispatch(setLikesById(byId));

    if (!allIds.length) return;

    const previousLikeId = allIds[allIds.length - 1];
    const previous = byId[previousLikeId].autoIncrementId;
    dispatchUpdateFrameLikes(dispatch, frame, {
        allIds,
        end: allIds.length < 20,
        previous,
        status: 'SUCCESS',
    });
};

export default successGetLikes;
