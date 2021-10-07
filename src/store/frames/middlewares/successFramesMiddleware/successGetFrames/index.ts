import { Dispatch } from 'redux';

import {
    setFramesAllIds,
    setFramesById,
    setGalerieFramesAllIds,
    updateFramesEnd,
    updateFramesPrevious,
    updateFramesStatus,
    updateGalerieFramesEnd,
    updateGalerieFramesPrevious,
    updateGalerieFramesStatus,
} from '#store/frames/actionCreators';
import { combineFramesAllIds } from '#store/combineAllIds';
import { getFrameGaleriePictures } from '#store/galeriePictures/actionCreators';
import { getUserId } from '#store/users';
import { getGalerieId } from '#store/galeries';

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

    dispatch(setFramesById(byId));

    const galerieId = action.meta.query
        ? action.meta.query.galerieId
        : undefined;
    const previousFrameId = allIds[allIds.length - 1];
    const previous = byId[previousFrameId].autoIncrementId;

    if (galerieId) {
        const oldAllIds = getState().frames.allIds[galerieId] || [];
        const newAllIds = combineFramesAllIds(getState, oldAllIds, allIds);

        dispatch(setGalerieFramesAllIds(galerieId, newAllIds));
        dispatch(updateGalerieFramesEnd(galerieId, allIds.length < 20));
        dispatch(updateGalerieFramesPrevious(galerieId, previous));
        dispatch(updateGalerieFramesStatus(galerieId, 'SUCCESS'));
    } else {
        const oldAllIds = getState().frames.allIds[''] || [];
        const newAllIds = combineFramesAllIds(getState, oldAllIds, allIds);

        dispatch(updateFramesStatus('SUCCESS'));
        dispatch(setFramesAllIds(newAllIds));
        dispatch(updateFramesEnd(allIds.length < 20));
        dispatch(updateFramesPrevious(previous));
    }

    allIds.forEach((id) => {
        dispatch(getFrameGaleriePictures(id));
        const user = getState().users.byId[byId[id].userId];
        if (!user) dispatch(getUserId(byId[id].userId));
        const galerie = getState().galeries.byId[byId[id].galerieId];
        if (!galerie) dispatch(getGalerieId(byId[id].galerieId));
    });
};

export default successGetFrames;
