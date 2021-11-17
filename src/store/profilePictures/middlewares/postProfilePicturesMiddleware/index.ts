import { Middleware } from 'redux';

import { dispatchPostProfilePicture } from '#store/dispatchers';
import { PROFILE_PICTURES_POST } from '#store/profilePictures/actionTypes';
import { updateProfilePicturesLoadingPost } from '#store/profilePictures/actionCreators';

const postProfilePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== PROFILE_PICTURES_POST) return;
        const loading = getState().profilePictures.loading.post;
        if (
            !(action.payload instanceof FormData) ||
            loading.includes('LOADING')
        )
            return;

        dispatchPostProfilePicture(dispatch, action.payload);
        dispatch(updateProfilePicturesLoadingPost('LOADING'));
    };

export default postProfilePicturesMiddleware;
