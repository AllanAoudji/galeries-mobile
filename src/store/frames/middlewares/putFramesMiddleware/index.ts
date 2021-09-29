import { Middleware } from 'redux';

import { dispatchPutFrame } from '#store/dispatchers';
import { updateFramesLoadingPut } from '#store/frames/actionCreators';
import { FRAMES_PUT } from '#store/frames/actionTypes';
import { getFramesLoadingPut } from '#store/getters';

const putFrameMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === FRAMES_PUT) {
            const frameId = action.meta.query
                ? action.meta.query.frameId
                : undefined;
            const loading = getFramesLoadingPut(getState);
            if (
                typeof action.payload.description === 'string' &&
                typeof action.payload.id === 'string' &&
                frameId &&
                !loading.includes('LOADING')
            ) {
                dispatch(updateFramesLoadingPut('LOADING'));
                dispatchPutFrame(dispatch, frameId, action.payload);
            }
        }
    };

export default putFrameMiddleware;
