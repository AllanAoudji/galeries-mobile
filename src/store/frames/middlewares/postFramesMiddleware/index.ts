import { Middleware } from 'redux';

import { dispatchPostFrame } from '#store/dispatchers';
import {
    FRAMES_POST,
    resetFramesFieldsError,
    updateFramesLoadingPost,
} from '#store/frames';

const postFramesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === FRAMES_POST) {
            const galerieId = action.meta.query
                ? action.meta.query.galerieId
                : undefined;
            if (action.payload instanceof FormData && galerieId) {
                dispatch(updateFramesLoadingPost('LOADING'));
                dispatch(resetFramesFieldsError());
                dispatchPostFrame(dispatch, galerieId, action.payload);
            }
        }
    };

export default postFramesMiddleware;
