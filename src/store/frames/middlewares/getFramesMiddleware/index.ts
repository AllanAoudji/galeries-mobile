import { Middleware } from 'redux';

import {
    dispatchGetFrame,
    dispatchGetFrames,
    dispatchGetGalerieFrames,
} from '#store/dispatchers';
import {
    updateFramesStatus,
    updateGalerieFramesStatus,
} from '#store/frames/actionCreators';
import { FRAMES_GET } from '#store/frames/actionTypes';

const getFramesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type !== FRAMES_GET) return;

        const galerieId = action.meta.query
            ? action.meta.query.galerieId
            : undefined;

        if (typeof action.payload === 'string')
            dispatchGetFrame(dispatch, action.payload);
        else if (typeof galerieId === 'string') {
            const end = getState().frames.end[galerieId] || false;
            const status = getState().frames.status[galerieId] || 'PENDING';
            if (end || status.includes('LOADING')) return;

            const newStatus: Store.Status =
                status === 'PENDING' ? 'INITIAL_LOADING' : 'LOADING';
            const previous = getState().frames.previous[galerieId];

            dispatch(updateGalerieFramesStatus(galerieId, newStatus));
            dispatchGetGalerieFrames(dispatch, galerieId, previous);
        } else {
            const end = getState().frames.end[''];
            const status = getState().frames.status[''] || 'PENDING';
            if (end || status.includes('LOADING')) return;

            const newStatus: Store.Status =
                status === 'PENDING' ? 'INITIAL_LOADING' : 'LOADING';
            const previous = getState().frames.previous[''];

            dispatch(updateFramesStatus(newStatus));
            dispatchGetFrames(dispatch, previous);
        }
    };

export default getFramesMiddleware;
