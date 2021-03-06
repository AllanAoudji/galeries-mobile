import { Middleware } from 'redux';

import { PROFILE_PICTURES_RESET } from '#store/profilePictures/actionTypes';
import {
    resetProfilePicturesAllId,
    resetProfilePicturesById,
    resetProfilePicturesCurrent,
    resetProfilePicturesEnd,
    resetProfilePicturesId,
    resetProfilePicturesLoadingDelete,
    resetProfilePicturesLoadingPost,
    resetProfilePicturesLoadingPut,
    resetProfilePicturesPrevious,
    resetProfilePicturesStatus,
} from '#store/profilePictures/actionCreators';

const resetProfilePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type !== PROFILE_PICTURES_RESET) return;

        dispatch(resetProfilePicturesAllId());
        dispatch(resetProfilePicturesById());
        dispatch(resetProfilePicturesCurrent());
        dispatch(resetProfilePicturesEnd());
        dispatch(resetProfilePicturesId());
        dispatch(resetProfilePicturesLoadingDelete());
        dispatch(resetProfilePicturesLoadingPost());
        dispatch(resetProfilePicturesLoadingPut());
        dispatch(resetProfilePicturesPrevious());
        dispatch(resetProfilePicturesStatus());
    };

export default resetProfilePicturesMiddleware;
