import { Middleware } from 'redux';

import { dispatchPutFrame } from '#store/dispatchers';
import { FRAMES_PUT, updateFramesLoadingPut } from '#store/frames';

const putFrameMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === FRAMES_PUT) {
            const frameId = action.meta.query
                ? action.meta.query.frameId
                : undefined;
            if (
                typeof action.payload.description === 'string' &&
                typeof action.payload.id === 'string' &&
                frameId
            ) {
                dispatch(updateFramesLoadingPut('LOADING'));
                dispatchPutFrame(dispatch, frameId, action.payload);
            }
        }
    };

export default putFrameMiddleware;
