import { Middleware } from 'redux';

import { PROFILE_PICTURES_DELETE } from '#store/profilePictures/actionTypes';
import { dispatchDeleteProfilePicture } from '#store/dispatchers';
import { updateGaleriesLoadingPut } from '#store/galeries';

const deleteProfilePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (
            typeof action.payload === 'string' &&
            action.type === PROFILE_PICTURES_DELETE
        ) {
            dispatch(updateGaleriesLoadingPut('LOADING'));
            dispatchDeleteProfilePicture(dispatch, action.payload);
        }
    };

export default deleteProfilePicturesMiddleware;
