import { Middleware } from 'redux';

import {
    dispatchGetFrameGaleriePictures,
    dispatchGetGalerieCoverPicture,
    dispatchUpdateFrameGaleriePictures,
    dispatchUpdateGalerieCoverPicture,
} from '#store/dispatchers';
import { GALERIE_PICTURES_GET } from '#store/galeriePictures/actionTypes';
import { getFrame, getGalerie } from '#store/getters';

const getGaleriePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);

        if (action.type !== GALERIE_PICTURES_GET) return;

        const frameId = action.meta.query
            ? action.meta.query.frameId
            : undefined;
        const galerieId = action.meta.query
            ? action.meta.query.galerieId
            : undefined;

        if (frameId) {
            const frame = getFrame(getState, frameId);
            if (!frame) return;
            const galeriePicturesStatus = frame.galeriePictures
                ? frame.galeriePictures.status
                : 'PENDING';
            if (galeriePicturesStatus.includes('LOADING')) return;

            dispatchUpdateFrameGaleriePictures(dispatch, frame, {
                status: 'LOADING',
            });
            dispatchGetFrameGaleriePictures(dispatch, frameId);
        } else if (galerieId) {
            const galerie = getGalerie(getState, galerieId);
            if (!galerie) return;
            const galeriepictureStatus = galerie.coverPicture
                ? galerie.coverPicture.status
                : 'PENDING';
            if (galeriepictureStatus.includes('LOADING')) return;

            dispatchUpdateGalerieCoverPicture(dispatch, galerie, {
                status: 'LOADING',
            });
            dispatchGetGalerieCoverPicture(dispatch, galerieId);
        }
    };

export default getGaleriePicturesMiddleware;
