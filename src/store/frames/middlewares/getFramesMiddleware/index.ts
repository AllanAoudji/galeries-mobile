import { Middleware } from 'redux';

import {
    dispatchGetFrame,
    dispatchGetFrames,
    dispatchGetGalerieFrames,
    dispatchGetNotificationFrames,
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

        const frameId = action.meta.query
            ? action.meta.query.frameId
            : undefined;
        const notificationId = action.meta.query
            ? action.meta.query.notificationId
            : undefined;
        const galerieId = action.meta.query
            ? action.meta.query.galerieId
            : undefined;

        if (frameId) dispatchGetFrame(dispatch, action.payload);
        else if (galerieId) {
            const end = getState().frames.end[galerieId] || false;
            const status = getState().frames.status[galerieId] || 'PENDING';
            if (end) return;
            if (status.includes('LOADING')) return;
            if (status === 'REFRESH') return;

            const newStatus: Store.Status =
                status === 'PENDING' ? 'INITIAL_LOADING' : 'LOADING';
            const previous = getState().frames.previous[galerieId];

            dispatch(updateGalerieFramesStatus(galerieId, newStatus));
            dispatchGetGalerieFrames(dispatch, galerieId, previous);
        } else if (notificationId) {
            const status =
                getState().frames.status[notificationId] || 'PENDING';
            if (status.includes('LOADING')) return;
            if (status === 'REFRESH') return;

            dispatch(updateGalerieFramesStatus(notificationId, 'LOADING'));
            dispatchGetNotificationFrames(dispatch, notificationId);
        } else {
            const end = getState().frames.end[''];
            const status = getState().frames.status[''] || 'PENDING';
            if (end) return;
            if (status.includes('LOADING')) return;
            if (status === 'REFRESH') return;

            const newStatus: Store.Status =
                status === 'PENDING' ? 'INITIAL_LOADING' : 'LOADING';
            const previous = getState().frames.previous[''];

            dispatch(updateFramesStatus(newStatus));
            dispatchGetFrames(dispatch, previous);
        }
    };

export default getFramesMiddleware;
