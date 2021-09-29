import { Dispatch, Middleware } from 'redux';

import { ERROR_MESSAGE } from '#helpers/constants';
import { API_ERROR } from '#store/api/actionTypes';
import {
    dispatchErrorNotification,
    dispatchUpdateFrameComments,
} from '#store/dispatchers';
import { COMMENTS } from '#store/genericActionTypes';
import { getFrame } from '#store/getters';
import {
    updateCommentsLoadingDelete,
    updateCommentsLoadingPost,
} from '#store/comments/actionCreators';

const errorDefaultMethod = (dispatch: Dispatch<Store.Action>) =>
    dispatchErrorNotification(dispatch, ERROR_MESSAGE.METHOD_NOT_FOUND);
const errorDeleteMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    dispatch(updateCommentsLoadingDelete('ERROR'));
    dispatchErrorNotification(dispatch, action);
};
const errorGetMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const frameId = action.payload.query
        ? action.payload.query.frameId
        : undefined;
    if (frameId) {
        const frame = getFrame(getState, frameId);
        if (frame)
            dispatchUpdateFrameComments(dispatch, frame, {
                status: 'ERROR',
            });
    }
    dispatchErrorNotification(dispatch, action);
};
const errorPostMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    dispatch(updateCommentsLoadingPost('ERROR'));
    dispatchErrorNotification(dispatch, action);
};

const errorCommentsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${COMMENTS} ${API_ERROR}`) {
            switch (action.meta.method) {
                case 'DELETE':
                    errorDeleteMethod(dispatch, action);
                    break;
                case 'GET':
                    errorGetMethod(dispatch, getState, action);
                    break;
                case 'POST':
                    errorPostMethod(dispatch, action);
                    break;
                default:
                    errorDefaultMethod(dispatch);
            }
        }
    };

export default errorCommentsMiddleware;
