import { Middleware } from 'redux';

import { PROFILE_PICTURES_GET } from '#store/profilePictures/actionTypes';
import { getMe, getUser } from '#store/getters';
import {
    dispatchGetMeCurrentProfilePicture,
    dispatchGetprofilePicture,
    dispatchGetProfilePictures,
    dispatchGetUserCurrentProfilePicture,
    dispatchUserCurrentProfilePicture,
} from '#store/dispatchers';

const getProfilePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === PROFILE_PICTURES_GET) {
            const userId = action.meta.query
                ? action.meta.query.userId
                : undefined;
            if (userId === 'me') {
                const me = getMe(getState);
                if (me) {
                    const status = me.currentProfilePicture
                        ? me.currentProfilePicture.status
                        : 'PENDING';
                    if (status === 'PENDING') {
                        dispatchUserCurrentProfilePicture(dispatch, me, {
                            status: 'PENDING',
                        });
                        dispatchGetMeCurrentProfilePicture(dispatch);
                    }
                }
            } else if (userId) {
                const user = getUser(getState, userId);
                if (user) {
                    const status = user.currentProfilePicture
                        ? user.currentProfilePicture.status
                        : 'PENDING';
                    if (status === 'PENDING') {
                        dispatchUserCurrentProfilePicture(dispatch, user, {
                            status: 'PENDING',
                        });
                        dispatchGetUserCurrentProfilePicture(dispatch, userId);
                    }
                }
            } else if (typeof action.payload === 'string')
                dispatchGetprofilePicture(dispatch, action.payload);
            else dispatchGetProfilePictures(dispatch);
        }
    };

export default getProfilePicturesMiddleware;
