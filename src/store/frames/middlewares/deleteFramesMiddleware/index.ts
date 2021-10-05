import { Middleware } from 'redux';

import { dispatchDeleteFrame } from '#store/dispatchers';
import { updateFramesLoadingDelete } from '#store/frames/actionCreators';
import { FRAMES_DELETE } from '#store/frames/actionTypes';

const deleteFramesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== FRAMES_DELETE) return;
        const loading = getState().frames.loading.delete;
        if (typeof action.payload !== 'string' || loading.includes('LOADING'))
            return;

        dispatch(updateFramesLoadingDelete('LOADING'));
        dispatchDeleteFrame(dispatch, action.payload);
    };

export default deleteFramesMiddleware;
