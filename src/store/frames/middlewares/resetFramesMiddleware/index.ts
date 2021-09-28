import { Middleware } from 'redux';

import {
    FRAMES_RESET,
    resetFramesAllIds,
    resetFramesById,
    resetFramesCurrent,
    resetFramesEnd,
    resetFramesFieldsError,
    resetFramesLoadingDelete,
    resetFramesLoadingPost,
    resetFramesLoadingPut,
    resetFramesPrevious,
    resetFramesStatus,
} from '#store/frames';

const resetFramesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === FRAMES_RESET) {
            dispatch(resetFramesAllIds());
            dispatch(resetFramesById());
            dispatch(resetFramesCurrent());
            dispatch(resetFramesEnd());
            dispatch(resetFramesFieldsError());
            dispatch(resetFramesLoadingDelete());
            dispatch(resetFramesLoadingPost());
            dispatch(resetFramesLoadingPut());
            dispatch(resetFramesPrevious());
            dispatch(resetFramesStatus());
        }
    };

export default resetFramesMiddleware;
