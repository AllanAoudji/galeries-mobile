import { Middleware } from 'redux';

import {
    dispatchGetFrameGaleriePictures,
    dispatchGetGalerieCoverPicture,
    dispatchUpdateFrameGaleriePictures,
    dispatchUpdateGalerieCoverPicture,
} from '#store/dispatchers';
import { GALERIE_PICTURES_GET } from '#store/galeriePictures';
import { getFrame, getGalerie } from '#store/getters';

const getGaleriePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === GALERIE_PICTURES_GET) {
            const frameId = action.meta.query
                ? action.meta.query.frameId
                : undefined;
            const galerieId = action.meta.query
                ? action.meta.query.galerieId
                : undefined;
            if (frameId) {
                const frame = getFrame(getState, frameId);
                const galeriePicturesStatus =
                    frame && frame.galeriePictures
                        ? frame.galeriePictures.status
                        : 'PENDING';
                if (frame && !galeriePicturesStatus.includes('LOADING')) {
                    dispatchUpdateFrameGaleriePictures(dispatch, frame, {
                        status: 'LOADING',
                    });
                    dispatchGetFrameGaleriePictures(dispatch, frameId);
                }
            } else if (typeof galerieId === 'string') {
                const galerie = getGalerie(getState, galerieId);
                const galeriepictureStatus =
                    galerie && galerie.coverPicture
                        ? galerie.coverPicture.status
                        : 'PENDING';
                if (galerie && !galeriepictureStatus.includes('LOADING')) {
                    dispatchUpdateGalerieCoverPicture(dispatch, galerie, {
                        status: 'LOADING',
                    });
                    dispatchGetGalerieCoverPicture(dispatch, galerieId);
                }
            }
        }
    };

export default getGaleriePicturesMiddleware;
