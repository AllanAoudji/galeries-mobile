import { Middleware } from 'redux';

import {
    resetGaleriePicturesAllIds,
    resetGaleriePicturesById,
    resetGaleriePicturesId,
    resetGaleriePicturesStatus,
} from '#store/galeriePictures/actionCreators';
import { GALERIE_PICTURES_RESET } from '#store/galeriePictures/actionTypes';

const resetGaleriePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== GALERIE_PICTURES_RESET) return;

        dispatch(resetGaleriePicturesById());
        dispatch(resetGaleriePicturesAllIds());
        dispatch(resetGaleriePicturesId());
        dispatch(resetGaleriePicturesStatus());
    };

export default resetGaleriePicturesMiddleware;
