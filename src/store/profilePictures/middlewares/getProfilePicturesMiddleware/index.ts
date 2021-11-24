import { Middleware } from 'redux';

import {
    dispatchGetMeCurrentProfilePicture,
    dispatchGetprofilePicture,
    dispatchGetProfilePictures,
    dispatchGetUserCurrentProfilePicture,
} from '#store/dispatchers';
import { updateProfilePicturesStatus } from '#store/profilePictures/actionCreators';
import { PROFILE_PICTURES_GET } from '#store/profilePictures/actionTypes';

const getProfilePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type !== PROFILE_PICTURES_GET) return;

        const userId = action.meta.query ? action.meta.query.userId : undefined;

        if (userId) {
            const status =
                getState().profilePictures.status[userId] || 'PENDING';
            if (status.includes('LOADING')) return;

            dispatch(updateProfilePicturesStatus(userId, 'LOADING'));
            if (userId === 'me') {
                const meId = getState().me.id;
                if (!meId) return;

                dispatchGetMeCurrentProfilePicture(dispatch, meId);
            } else dispatchGetUserCurrentProfilePicture(dispatch, userId);
        } else if (typeof action.payload === 'string')
            dispatchGetprofilePicture(dispatch, action.payload);
        else {
            const { end, previous } = getState().profilePictures;
            const status = getState().profilePictures.status[''] || 'PENDING';
            if (end) return;
            if (status && status.includes('LOADING')) return;
            if (status === 'REFRESH') return;
            const newStatus: Store.Status =
                status === 'PENDING' ? 'INITIAL_LOADING' : 'LOADING';

            dispatch(updateProfilePicturesStatus('', newStatus));
            dispatchGetProfilePictures(dispatch, previous);
        }
    };

export default getProfilePicturesMiddleware;
