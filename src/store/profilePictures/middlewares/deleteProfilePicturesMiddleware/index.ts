import { Middleware } from 'redux';

import { dispatchDeleteProfilePicture } from '#store/dispatchers';
import { updateGaleriesLoadingPut } from '#store/galeries/actionCreators';
import { PROFILE_PICTURES_DELETE } from '#store/profilePictures/actionTypes';

const deleteProfilePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== PROFILE_PICTURES_DELETE) return;
        const loading = getState().profilePictures.loading.delete;
        if (typeof action.payload !== 'string' || loading.includes('LOADING'))
            return;

        dispatch(updateGaleriesLoadingPut('LOADING'));
        dispatchDeleteProfilePicture(dispatch, action.payload);
    };

export default deleteProfilePicturesMiddleware;
