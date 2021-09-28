import { Dispatch, Middleware } from 'redux';

import { ERROR_MESSAGE } from '#helpers/constants';
import { API_ERROR } from '#store/api';
import {
    dispatchErrorNotification,
    dispatchUserCurrentProfilePicture,
} from '#store/dispatchers';
import { PROFILE_PICTURES } from '#store/genericActionTypes';
import { getUser } from '#store/getters';
import {
    updateProfilePicturesLoadingDelete,
    updateProfilePicturesLoadingPost,
} from '#store/profilePictures';

const errorDefaultMethod = (dispatch: Dispatch<Store.Action>) =>
    dispatchErrorNotification(dispatch, ERROR_MESSAGE.METHOD_NOT_FOUND);
const errorDeleteMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    dispatchErrorNotification(dispatch, action);
    dispatch(updateProfilePicturesLoadingDelete('ERROR'));
};
const errorGetMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const userId = action.payload.query
        ? action.payload.query.userId
        : undefined;
    if (typeof userId === 'string') {
        const user = getUser(getState, userId);
        if (user)
            dispatchUserCurrentProfilePicture(dispatch, user, {
                status: 'ERROR',
            });
    }
    dispatchErrorNotification(dispatch, action);
};
const errorPostMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    dispatchErrorNotification(dispatch, action);
    dispatch(updateProfilePicturesLoadingPost('ERROR'));
};

const errorProfilePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${PROFILE_PICTURES} ${API_ERROR}`) {
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

export default errorProfilePicturesMiddleware;
