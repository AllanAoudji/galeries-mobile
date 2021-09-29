import { Middleware } from 'redux';

import {
    dispatchGetFrame,
    dispatchGetFrames,
    dispatchGetGalerieFrames,
    dispatchUpdateGalerieFrames,
} from '#store/dispatchers';
import { updateFramesStatus } from '#store/frames/actionCreators';
import { FRAMES_GET } from '#store/frames/actionTypes';
import {
    getFramesEnd,
    getFramesPrevious,
    getFramesStatus,
    getGalerie,
} from '#store/getters';

const getFramesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === FRAMES_GET) {
            const galerieId = action.meta.query
                ? action.meta.query.galerieId
                : undefined;
            if (typeof action.payload === 'string')
                dispatchGetFrame(dispatch, action.payload);
            else if (typeof galerieId === 'string') {
                const galerie = getGalerie(getState, galerieId);
                const end = galerie.frames ? galerie.frames.end : false;
                const status = galerie.frames
                    ? galerie.frames.status
                    : 'PENDING';
                if (!end && !status.includes('LOADING')) {
                    const newStatus: Store.Status =
                        status === 'PENDING' ? 'INITIAL_LOADING' : 'LOADING';
                    const previous = galerie.users
                        ? galerie.users.previous
                        : undefined;
                    dispatchUpdateGalerieFrames(dispatch, getState, galerie, {
                        status: newStatus,
                    });
                    dispatchGetGalerieFrames(dispatch, galerieId, previous);
                }
            } else {
                const end = getFramesEnd(getState);
                const status = getFramesStatus(getState);
                if (!end && !status.includes('LOADING')) {
                    const newStatus: Store.Status =
                        status === 'PENDING' ? 'INITIAL_LOADING' : 'LOADING';
                    const previous = getFramesPrevious(getState);
                    console.log('get Frames');
                    dispatch(updateFramesStatus(newStatus));
                    dispatchGetFrames(dispatch, previous);
                }
            }
        }
    };

export default getFramesMiddleware;
