import { Dispatch, Middleware } from 'redux';

import { API_SUCCESS } from '#store/api/actionTypes';
import {
    setCommentsById,
    updateCommentsLoadingPost,
} from '#store/comments/actionCreators';
import { dispatchUpdateFrameComments } from '#store/dispatchers';
import { COMMENTS } from '#store/genericActionTypes';
import { getFrame } from '#store/getters';

import successDefaultMethod from './successDefaultMethod';
import successDeleteComment from './successDeleteComment';
import successGetComments from './successGetComments';

const successPostComments = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload.data === 'object') {
        const comment = action.payload.data;
        if (comment && typeof comment === 'object') {
            const frameId = action.meta.query
                ? action.meta.query.frameId
                : undefined;
            const byId = { [comment.id]: comment };
            const allIds = [comment.id];
            dispatch(setCommentsById(byId));
            if (frameId) {
                const frame = getFrame(getState, frameId);
                if (frame)
                    dispatchUpdateFrameComments(dispatch, frame, {
                        allIds,
                    });
            }
        }
        dispatch(updateCommentsLoadingPost('SUCCESS'));
    }
};
const successCommentsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== `${COMMENTS} ${API_SUCCESS}`) return;

        switch (action.meta.method) {
            case 'DELETE':
                successDeleteComment(dispatch, getState, action);
                break;
            case 'GET':
                successGetComments(dispatch, getState, action);
                break;
            case 'POST':
                successPostComments(dispatch, getState, action);
                break;
            default:
                successDefaultMethod(dispatch);
        }
    };

export default successCommentsMiddleware;
