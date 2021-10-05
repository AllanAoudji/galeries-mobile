import { Middleware } from 'redux';

import { dispatchPutFrame } from '#store/dispatchers';
import { updateFramesLoadingPut } from '#store/frames/actionCreators';
import { FRAMES_PUT } from '#store/frames/actionTypes';

const putFrameMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== FRAMES_PUT) return;

        const frameId = action.meta.query
            ? action.meta.query.frameId
            : undefined;
        const loading = getState().frames.loading.put;

        if (
            typeof action.payload !== 'object' ||
            typeof action.payload.description !== 'string' ||
            !frameId ||
            loading.includes('LOADING')
        )
            return;

        dispatch(updateFramesLoadingPut('LOADING'));
        dispatchPutFrame(dispatch, frameId, action.payload);
    };

export default putFrameMiddleware;
