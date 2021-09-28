import { Middleware } from 'redux';

import { PROFILE_PICTURES_DELETE } from '#store/profilePictures/actionTypes';
import { dispatchDeleteProfilePicture } from '#store/dispatchers';
import { updateGaleriesLoadingPut } from '#store/galeries';
import { getProfilePicturesLoadingDelete } from '#store/getters';

const deleteProfilePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === PROFILE_PICTURES_DELETE) {
            const loading = getProfilePicturesLoadingDelete(getState);
            if (
                typeof action.payload === 'string' &&
                !loading.includes('LOADING')
            ) {
                dispatch(updateGaleriesLoadingPut('LOADING'));
                dispatchDeleteProfilePicture(dispatch, action.payload);
            }
        }
    };

export default deleteProfilePicturesMiddleware;
