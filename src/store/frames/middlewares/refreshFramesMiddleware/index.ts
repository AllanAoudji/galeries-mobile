import { Middleware } from 'redux';

import {
    dispatchRefreshGalerieFrames,
    dispatchRefreshFrames,
} from '#store/dispatchers';
import { updateFramesStatus } from '#store/frames/actionCreators';
import { FRAMES_REFRESH } from '#store/frames/actionTypes';

const refreshFramesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== FRAMES_REFRESH) return;

        const galerieId = action.meta.query
            ? action.meta.query.galerieId
            : undefined;

        if (galerieId) {
            const status = getState().frames.status[galerieId] || 'PENDING';
            if (status.includes('LOADING')) return;
            if (status === 'REFRESH') return;

            dispatch(updateFramesStatus('REFRESH'));
            dispatchRefreshGalerieFrames(dispatch, galerieId);
        } else {
            const status = getState().frames.status[''] || 'PENDING';
            if (status.includes('LOADING')) return;
            if (status === 'REFRESH') return;

            dispatch(updateFramesStatus('REFRESH'));
            dispatchRefreshFrames(dispatch);
        }
    };

export default refreshFramesMiddleware;
