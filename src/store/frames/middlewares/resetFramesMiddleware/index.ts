import { Middleware } from 'redux';

import {
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
} from '#store/frames/actionCreators';
import { FRAMES_RESET } from '#store/frames/actionTypes';

const resetFramesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== FRAMES_RESET) return;

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
    };

export default resetFramesMiddleware;
