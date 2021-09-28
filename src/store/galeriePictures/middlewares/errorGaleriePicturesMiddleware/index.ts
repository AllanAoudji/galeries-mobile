import { Middleware } from 'redux';

import { API_ERROR } from '#store/api';
import {
    dispatchErrorNotification,
    dispatchUpdateFrameGaleriePictures,
    dispatchUpdateGalerieCoverPicture,
} from '#store/dispatchers';
import { GALERIE_PICTURES } from '#store/genericActionTypes';
import { getFrame, getGalerie } from '#store/getters';
import { setLoading } from '#store/loading';

const errorGaleriePictures: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${GALERIE_PICTURES} ${API_ERROR}`) {
            const frameId = action.meta.query
                ? action.meta.query.frameId
                : undefined;
            const galerieId = action.meta.query
                ? action.meta.query.galerieId
                : undefined;
            if (frameId) {
                const frame = getFrame(getState, frameId);
                if (frame)
                    dispatchUpdateFrameGaleriePictures(dispatch, frame, {
                        status: 'ERROR',
                    });
            } else if (galerieId) {
                const galerie = getGalerie(getState, galerieId);
                if (galerie)
                    dispatchUpdateGalerieCoverPicture(dispatch, galerie, {
                        status: 'ERROR',
                    });
            }
            dispatchErrorNotification(dispatch, action);
            dispatch(setLoading(false));
        }
    };

export default errorGaleriePictures;
