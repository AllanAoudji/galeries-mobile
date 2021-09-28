import { Middleware } from 'redux';

import {
    GALERIE_PICTURES_RESET,
    resetGaleriePicturesById,
} from '#store/galeriePictures';

const resetGaleriePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === GALERIE_PICTURES_RESET)
            dispatch(resetGaleriePicturesById());
    };

export default resetGaleriePicturesMiddleware;
