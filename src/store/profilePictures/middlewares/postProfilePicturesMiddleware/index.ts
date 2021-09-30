import { Middleware } from 'redux';

import { dispatchPostProfilePicture } from '#store/dispatchers';
import { getProfilePicturesLoadingPost } from '#store/getters';
import { PROFILE_PICTURES_POST } from '#store/profilePictures/actionTypes';
import { updateProfilePicturesLoadingPost } from '#store/profilePictures/actionCreators';

const postProfilePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== PROFILE_PICTURES_POST) return;
        const loading = getProfilePicturesLoadingPost(getState);
        if (
            !(action.payload instanceof FormData) ||
            loading.includes('LOADING')
        )
            return;

        dispatch(updateProfilePicturesLoadingPost('LOADING'));
        dispatchPostProfilePicture(dispatch, action.payload);
    };

export default postProfilePicturesMiddleware;
