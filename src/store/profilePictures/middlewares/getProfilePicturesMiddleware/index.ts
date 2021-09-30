import { Middleware } from 'redux';

import {
    dispatchGetMeCurrentProfilePicture,
    dispatchGetprofilePicture,
    dispatchGetProfilePictures,
    dispatchGetUserCurrentProfilePicture,
    dispatchUserCurrentProfilePicture,
} from '#store/dispatchers';
import { getMe, getUser } from '#store/getters';
import { PROFILE_PICTURES_GET } from '#store/profilePictures/actionTypes';

const getProfilePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type !== PROFILE_PICTURES_GET) return;

        const userId = action.meta.query ? action.meta.query.userId : undefined;

        if (userId === 'me') {
            const me = getMe(getState);
            if (!me) return;
            const status = me.currentProfilePicture
                ? me.currentProfilePicture.status
                : 'PENDING';
            if (status !== 'PENDING') return;

            dispatchUserCurrentProfilePicture(dispatch, me, {
                status: 'LOADING',
            });
            dispatchGetMeCurrentProfilePicture(dispatch);
        } else if (userId) {
            const user = getUser(getState, userId);
            if (!user) return;
            const status = user.currentProfilePicture
                ? user.currentProfilePicture.status
                : 'PENDING';
            if (status !== 'PENDING') return;

            dispatchUserCurrentProfilePicture(dispatch, user, {
                status: 'LOADING',
            });
            dispatchGetUserCurrentProfilePicture(dispatch, userId);
        } else if (typeof action.payload === 'string')
            dispatchGetprofilePicture(dispatch, action.payload);
        else dispatchGetProfilePictures(dispatch);
    };

export default getProfilePicturesMiddleware;
