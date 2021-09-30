import { Middleware } from 'redux';

import { dispatchPostFrame } from '#store/dispatchers';
import {
    resetFramesFieldsError,
    updateFramesLoadingPost,
} from '#store/frames/actionCreators';
import { FRAMES_POST } from '#store/frames/actionTypes';
import { getFramesLoadingPost } from '#store/getters';

const postFramesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== FRAMES_POST) return;

        const loading = getFramesLoadingPost(getState);
        const galerieId = action.meta.query
            ? action.meta.query.galerieId
            : undefined;

        if (
            !(action.payload instanceof FormData) ||
            !galerieId ||
            loading.includes('LOADING')
        )
            return;

        dispatch(updateFramesLoadingPost('LOADING'));
        dispatch(resetFramesFieldsError());
        dispatchPostFrame(dispatch, galerieId, action.payload);
    };

export default postFramesMiddleware;
