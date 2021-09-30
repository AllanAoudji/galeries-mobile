import { Middleware } from 'redux';

import { resetGaleriePicturesById } from '#store/galeriePictures/actionCreators';
import { GALERIE_PICTURES_RESET } from '#store/galeriePictures/actionTypes';

const resetGaleriePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== GALERIE_PICTURES_RESET) return;

        dispatch(resetGaleriePicturesById());
    };

export default resetGaleriePicturesMiddleware;
