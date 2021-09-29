import { Dispatch, Middleware } from 'redux';

import { ERROR_MESSAGE } from '#helpers/constants';
import { API_SUCCESS } from '#store/api/actionTypes';
import {
    dispatchDeleteGalerieFrame,
    dispatchErrorNotification,
    dispatchUpdateGalerieFrames,
} from '#store/dispatchers';
import {
    removeFramesAllIds,
    removeFramesById,
    resetFramesCurrent,
    setFramesAllIds,
    setFramesById,
    updateFramesById,
    updateFramesEnd,
    updateFramesLoadingDelete,
    updateFramesLoadingPost,
    updateFramesLoadingPut,
    updateFramesPrevious,
    updateFramesStatus,
} from '#store/frames/actionCreators';
import { getFrameGaleriePictures } from '#store/galeriePictures/actionCreators';
import { FRAMES } from '#store/genericActionTypes';
import { getGalerie, getFrame, getUser } from '#store/getters';
import { getUserId } from '#store/users/actionCreators';

const successDefaultMethod = (dispatch: Dispatch<Store.Action>) =>
    dispatchErrorNotification(dispatch, ERROR_MESSAGE.METHOD_NOT_FOUND);

const successDeleteFrame = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload.data === 'object') {
        const { frameId } = action.payload.data;
        if (typeof frameId === 'string') {
            const frame = getFrame(getState, frameId);
            if (frame) {
                dispatch(removeFramesById(frameId));
                dispatch(resetFramesCurrent());
                dispatch(removeFramesAllIds(frameId));
                const galerie = getGalerie(getState, frame.galerieId);
                if (galerie)
                    dispatchDeleteGalerieFrame(dispatch, galerie, frameId);
            }
        }
        dispatch(updateFramesLoadingDelete('SUCCESS'));
    }
};
const successGetFrames = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload.data === 'object') {
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
        if (allIds.length) {
            dispatch(setFramesById(byId));
            const galerieId = action.meta.query
                ? action.meta.query.galerieId
                : undefined;
            const previousFrameId = allIds[allIds.length - 1];
            const previous = byId[previousFrameId].autoIncrementId;
            if (galerieId) {
                const galerie = getGalerie(getState, galerieId);
                if (galerie)
                    dispatchUpdateGalerieFrames(dispatch, galerie, {
                        allIds,
                        end: allIds.length < 20,
                        status: 'SUCCESS',
                        previous,
                    });
            } else {
                dispatch(setFramesAllIds(allIds));
                dispatch(updateFramesEnd(allIds.length < 20));
                dispatch(updateFramesPrevious(previous));
                dispatch(updateFramesStatus('SUCCESS'));
            }
            allIds.forEach((id) => {
                dispatch(getFrameGaleriePictures(id));
                const user = getUser(getState, byId[id].userId);
                if (!user) dispatch(getUserId(byId[id].userId));
            });
        }
    }
};
const successPostFrames = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload.data === 'object') {
        const frame = action.payload.data;
        if (frame && typeof frame === 'object') {
            // TODO: Should extract galeriePictures.
            const galerieId = action.meta.query
                ? action.meta.query.galerieid
                : undefined;
            const byId = { [frame.id]: frame };
            const allIds = [frame.id];
            dispatch(setFramesById(byId));
            if (galerieId) {
                const galerie = getGalerie(getState, galerieId);
                if (galerie) {
                    dispatchUpdateGalerieFrames(dispatch, galerie, {
                        allIds,
                    });
                }
            } else dispatch(setFramesAllIds(allIds));
        }
        dispatch(updateFramesLoadingPost('SUCCESS'));
    }
};
const successPutFrame = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload.data === 'object') {
        const { description, frameId } = action.payload.data;
        if (typeof description === 'string' && typeof frameId === 'string') {
            const frame = getFrame(getState, frameId);
            if (frame)
                dispatch(
                    updateFramesById({
                        ...frame,
                        description,
                    })
                );
        }
        dispatch(updateFramesLoadingPut('SUCCESS'));
    }
};
const successFramesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${FRAMES} ${API_SUCCESS}`) {
            switch (action.meta.method) {
                case 'DELETE':
                    successDeleteFrame(dispatch, getState, action);
                    break;
                case 'GET':
                    successGetFrames(dispatch, getState, action);
                    break;
                case 'POST':
                    successPostFrames(dispatch, getState, action);
                    break;
                case 'PUT':
                    successPutFrame(dispatch, getState, action);
                    break;
                default:
                    successDefaultMethod(dispatch);
            }
        }
    };

export default successFramesMiddleware;
