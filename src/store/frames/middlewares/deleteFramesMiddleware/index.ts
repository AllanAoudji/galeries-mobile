import { Middleware } from 'redux';

import { dispatchDeleteFrame } from '#store/dispatchers';
import { FRAMES_DELETE, updateFramesLoadingDelete } from '#store/frames';

const deleteFramesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === FRAMES_DELETE) {
            if (typeof action.payload === 'string') {
                dispatch(updateFramesLoadingDelete('LOADING'));
                dispatchDeleteFrame(dispatch, action.payload);
            }
        }
    };

export default deleteFramesMiddleware;
