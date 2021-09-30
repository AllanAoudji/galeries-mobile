import { Dispatch } from 'redux';

import {
    setFramesAllIds,
    setFramesById,
    updateFramesEnd,
    updateFramesPrevious,
    updateFramesStatus,
} from '#store/frames/actionCreators';
import { combineFramesAllIds } from '#store/combineFrames';
import { dispatchUpdateGalerieFrames } from '#store/dispatchers';
import { getFrameGaleriePictures } from '#store/galeriePictures/actionCreators';
import {
    getFramesAllIds,
    getGalerie,
    getGalerieFramesAllIds,
    getUser,
} from '#store/getters';
import { getUserId } from '#store/users';

const successGetFrames = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload.data !== 'object') return;

    const allIds: string[] = [];
    const byId: { [key: string]: Store.Models.Frame } = {};
    const { frame, frames } = action.payload.data;
    if (frames && Array.isArray(frames))
        frames.forEach((f: Store.Models.Frame) => {
            allIds.push(f.id);
            byId[f.id] = f;
        });
    else if (frame && typeof frame === 'object') {
        allIds.push(frame.id);
        byId[frame.id] = frame;
    }

    if (!allIds.length) return;

    dispatch(setFramesById(byId));

    const galerieId = action.meta.query
        ? action.meta.query.galerieId
        : undefined;
    const previousFrameId = allIds[allIds.length - 1];
    const previous = byId[previousFrameId].autoIncrementId;

    if (galerieId) {
        const oldAllIds = getGalerieFramesAllIds(getState, galerieId) || [];
        const newAllIds = combineFramesAllIds(getState, oldAllIds, allIds);

        const galerie = getGalerie(getState, galerieId);
        if (galerie)
            dispatchUpdateGalerieFrames(dispatch, getState, galerie, {
                allIds: newAllIds,
                end: allIds.length < 20,
                status: 'SUCCESS',
                previous,
            });
    } else {
        const oldAllIds = getFramesAllIds(getState);
        const newAllIds = combineFramesAllIds(getState, oldAllIds, allIds);

        dispatch(updateFramesStatus('SUCCESS'));
        dispatch(setFramesAllIds(newAllIds));
        dispatch(updateFramesEnd(allIds.length < 20));
        dispatch(updateFramesPrevious(previous));
    }

    allIds.forEach((id) => {
        dispatch(getFrameGaleriePictures(id));
        const user = getUser(getState, byId[id].userId);
        if (!user) dispatch(getUserId(byId[id].userId));
    });
};

export default successGetFrames;
