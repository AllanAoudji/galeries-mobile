import { Middleware } from 'redux';

import { dispatchPutGaleriePicture } from '#store/dispatchers';
import { updateGaleriePicturesLoadingPut } from '#store/galeriePictures/actionCreators';
import { GALERIE_PICTURES_PUT } from '#store/galeriePictures/actionTypes';

const putGaleriePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== GALERIE_PICTURES_PUT) return;

        const frameId = action.meta.query
            ? action.meta.query.frameId
            : undefined;
        const galeriePictureId = action.meta.query
            ? action.meta.query.galeriePictureId
            : undefined;
        if (!frameId || !galeriePictureId) return;
        const loading = getState().galeriePictures.loading.put;
        if (loading.includes('LOADING')) return;

        dispatch(updateGaleriePicturesLoadingPut('LOADING'));
        dispatchPutGaleriePicture(dispatch, frameId, galeriePictureId);
    };

export default putGaleriePicturesMiddleware;
