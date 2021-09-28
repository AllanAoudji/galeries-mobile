import { Middleware } from 'redux';

import { dispatchPostProfilePicture } from '#store/dispatchers';
import { PROFILE_PICTURES_POST } from '#store/profilePictures/actionTypes';
import { updateProfilePicturesLoadingPost } from '#store/profilePictures';

const postProfilePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === PROFILE_PICTURES_POST) {
            if (action.payload instanceof FormData) {
                dispatch(updateProfilePicturesLoadingPost('LOADING'));
                dispatchPostProfilePicture(dispatch, action.payload);
            }
        }
    };

export default postProfilePicturesMiddleware;
