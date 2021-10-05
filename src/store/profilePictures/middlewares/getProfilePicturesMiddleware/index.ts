import { Middleware } from 'redux';

import {
    dispatchGetMeCurrentProfilePicture,
    dispatchGetprofilePicture,
    dispatchGetProfilePictures,
    dispatchGetUserCurrentProfilePicture,
} from '#store/dispatchers';
import { PROFILE_PICTURES_GET } from '#store/profilePictures/actionTypes';
import { updateProfilePicturesStatus } from '#store/profilePictures';

const getProfilePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type !== PROFILE_PICTURES_GET) return;

        const meId = getState().me.id;
        const userId = action.meta.query ? action.meta.query.userId : undefined;

        if (userId) {
            const status = getState().profilePictures.status[userId];
            if (status !== 'PENDING') return;

            dispatch(updateProfilePicturesStatus(userId, 'LOADING'));
            if (meId === userId) dispatchGetMeCurrentProfilePicture(dispatch);
            else dispatchGetUserCurrentProfilePicture(dispatch, userId);
        } else if (typeof action.payload === 'string')
            dispatchGetprofilePicture(dispatch, action.payload);
        else {
            dispatch(updateProfilePicturesStatus('', 'LOADING'));
            dispatchGetProfilePictures(dispatch);
        }
    };

export default getProfilePicturesMiddleware;
