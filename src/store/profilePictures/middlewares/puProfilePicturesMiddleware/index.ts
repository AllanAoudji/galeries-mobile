import { Middleware } from 'redux';

import { updateProfilePicturesLoadingPut } from '#store/profilePictures/actionCreators';
import { PROFILE_PICTURES_PUT } from '#store/profilePictures/actionTypes';
import { dispatchPutProfilePicture } from '#store/dispatchers';

const putProfilePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== PROFILE_PICTURES_PUT) return;

        const profilePictureId = action.meta.query
            ? action.meta.query.profilePictureId
            : undefined;

        if (!profilePictureId) return;
        const loading = getState().profilePictures.loading.put;
        if (loading.includes('LOADING')) return;

        dispatch(updateProfilePicturesLoadingPut('LOADING'));
        dispatchPutProfilePicture(dispatch, profilePictureId);
    };

export default putProfilePicturesMiddleware;
