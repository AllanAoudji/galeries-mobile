import { Middleware } from 'redux';

import {
    dispatchGetFrameGaleriePictures,
    dispatchGetGalerieCoverPicture,
} from '#store/dispatchers';
import { GALERIE_PICTURES_GET } from '#store/galeriePictures/actionTypes';
import { updateGaleriePicturesStatus } from '#store/galeriePictures/actionCreators';

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
            const frame = getState().frames.byId[frameId];
            if (!frame) return;
            const status =
                getState().galeriePictures.status[frameId] || 'PENDING';
            if (status !== 'PENDING') return;

            dispatch(updateGaleriePicturesStatus(frameId, 'LOADING'));
            dispatchGetFrameGaleriePictures(dispatch, frameId);
        } else if (galerieId) {
            const galerie = getState().galeries.byId[galerieId];
            if (!galerie) return;

            const status =
                getState().galeriePictures.status[galerieId] || 'PENDING';
            if (status !== 'PENDING' && status !== 'SUCCESS') return;

            dispatch(updateGaleriePicturesStatus(galerieId, 'LOADING'));
            dispatchGetGalerieCoverPicture(dispatch, galerieId);
        }
    };

export default getGaleriePicturesMiddleware;
