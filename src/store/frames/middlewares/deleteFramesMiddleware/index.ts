import { Middleware } from 'redux';

import { dispatchDeleteFrame } from '#store/dispatchers';
import { FRAMES_DELETE, updateFramesLoadingDelete } from '#store/frames';
import { getFramesLoadingDelete } from '#store/getters';

const deleteFramesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === FRAMES_DELETE) {
            const loading = getFramesLoadingDelete(getState);
            if (
                typeof action.payload === 'string' &&
                !loading.includes('LOADING')
            ) {
                dispatch(updateFramesLoadingDelete('LOADING'));
                dispatchDeleteFrame(dispatch, action.payload);
            }
        }
    };

export default deleteFramesMiddleware;
