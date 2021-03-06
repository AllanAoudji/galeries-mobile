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
    const notificationId = action.meta.query
        ? action.meta.query.notificationId
        : undefined;
    const userId = action.meta.query ? action.meta.query.userId : undefined;
    const previousFrameId =
        allIds.length > 0 ? allIds[allIds.length - 1] : undefined;
    const previous = previousFrameId
        ? byId[previousFrameId].autoIncrementId
        : undefined;

    if (galerieId) {
        if (frame === undefined) {
            const oldAllIds = getState().frames.allIds[''] || [];
            let galeriesOldAllIds: string[];
            if (action.meta.refresh) galeriesOldAllIds = [];
            else galeriesOldAllIds = getState().frames.allIds[galerieId] || [];
            const galeriesNewAllIds = combineFramesAllIds(
                getState,
                galeriesOldAllIds,
                allIds
            );
            const newAllIds = combineFramesAllIds(getState, oldAllIds, allIds);

            dispatch(setGalerieFramesAllIds(galerieId, galeriesNewAllIds));
            dispatch(setFramesAllIds(newAllIds));
            dispatch(updateGalerieFramesEnd(galerieId, allIds.length < 20));
            if (previous)
                dispatch(updateGalerieFramesPrevious(galerieId, previous));
        }

        dispatch(updateGalerieFramesStatus(galerieId, 'SUCCESS'));
    } else if (notificationId) {
        if (frame === undefined) {
            let oldAllIds: string[];
            if (action.meta.refresh) oldAllIds = [];
            else oldAllIds = getState().frames.allIds[notificationId] || [];
            const newAllIds = combineFramesAllIds(getState, oldAllIds, allIds);

            dispatch(setGalerieFramesAllIds(notificationId, newAllIds));
            dispatch(
                updateGalerieFramesEnd(notificationId, allIds.length < 20)
            );
        }
        dispatch(updateGalerieFramesStatus(notificationId, 'SUCCESS'));
    } else if (userId) {
        if (frame === undefined) {
            let oldAllIds: string[];
            if (action.meta.refresh) oldAllIds = [];
            else oldAllIds = getState().frames.allIds[userId] || [];
            const newAllIds = combineFramesAllIds(getState, oldAllIds, allIds);

            dispatch(setGalerieFramesAllIds(userId, newAllIds));
            dispatch(updateGalerieFramesEnd(userId, allIds.length < 20));
            if (previous)
                dispatch(updateGalerieFramesPrevious(userId, previous));
        }
        dispatch(updateGalerieFramesStatus(userId, 'SUCCESS'));
    } else {
        if (frame === undefined) {
            let oldAllIds: string[];
            if (action.meta.refresh) oldAllIds = [];
            else oldAllIds = getState().frames.allIds[''] || [];
            const newAllIds = combineFramesAllIds(getState, oldAllIds, allIds);

            dispatch(setFramesAllIds(newAllIds));
            dispatch(updateFramesEnd(allIds.length < 20));
            if (previous) dispatch(updateFramesPrevious(previous));
        }

        dispatch(updateFramesStatus('SUCCESS'));
    }

    allIds.forEach((id) => {
        dispatch(getFrameGaleriePictures(id));

        const user = getState().users.byId[byId[id].userId];
        if (!user) dispatch(getUserId(byId[id].userId));

        const galerieStatus =
            getState().galeries.status.id[byId[id].galerieId] || 'PENDING';
        if (galerieStatus === 'PENDING') {
            dispatch(getGalerieId(byId[id].galerieId));
        }
    });
};

export default successGetFrames;
