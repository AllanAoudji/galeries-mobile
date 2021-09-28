import { Dispatch, Middleware } from 'redux';

import { ERROR_MESSAGE } from '#helpers/constants';
import { API_SUCCESS } from '#store/api';
import {
    dispatchErrorNotification,
    dispatchUpdateFrameGaleriePictures,
    dispatchUpdateGalerieCoverPicture,
} from '#store/dispatchers';
import { setGaleriePicturesById } from '#store/galeriePictures';
import { GALERIE_PICTURES } from '#store/genericActionTypes';
import { getFrame, getGalerie } from '#store/getters';

const successDefaultMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const frameId = action.meta.query ? action.meta.query.frameId : undefined;
    const galerieId = action.meta.query
        ? action.meta.query.galerieId
        : undefined;
    if (frameId) {
        const frame = getFrame(getState, frameId);
        if (frame)
            dispatchUpdateFrameGaleriePictures(dispatch, frame, {
                status: 'ERROR',
            });
    } else if (typeof galerieId === 'string') {
        const galerie = getGalerie(getState, galerieId);
        if (galerie)
            dispatchUpdateGalerieCoverPicture(dispatch, galerie, {
                status: 'ERROR',
            });
    }
    dispatchErrorNotification(dispatch, ERROR_MESSAGE.METHOD_NOT_FOUND);
};

const successGetGaleriePictures = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (
        typeof action.payload === 'object' &&
        typeof action.payload.data === 'object'
    ) {
        const { galeriePicture, galeriePictures } = action.payload.data;
        const allIds: string[] = [];
        const byId: { [key: string]: Store.Models.GaleriePicture } = {};
        const frameId = action.meta.query
            ? action.meta.query.frameId
            : undefined;
        const galerieId = action.meta.query
            ? action.meta.query.galerieId
            : undefined;
        let id: string | undefined;
        if (Array.isArray(galeriePictures)) {
            galeriePictures.forEach((gp: Store.Models.GaleriePicture) => {
                allIds.push(gp.id);
                byId[gp.id] = gp;
            });
        } else if (typeof galeriePicture === 'object') {
            byId[galeriePicture.id] = galeriePicture;
            id = galeriePicture.id;
        }
        if (allIds.length || typeof id === 'string') {
            dispatch(setGaleriePicturesById(byId));
            if (allIds.length && typeof frameId === 'string') {
                const frame = getFrame(getState, frameId);
                if (frame)
                    dispatchUpdateFrameGaleriePictures(dispatch, frame, {
                        allIds,
                        status: 'SUCCESS',
                    });
            } else if (
                typeof id === 'string' &&
                typeof galerieId === 'string'
            ) {
                const galerie = getGalerie(getState, galerieId);
                if (galerie)
                    dispatchUpdateGalerieCoverPicture(dispatch, galerie, {
                        id,
                        status: 'SUCCESS',
                    });
            }
        }
    }
};
const successGaleriePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${GALERIE_PICTURES} ${API_SUCCESS}`) {
            switch (action.meta.method) {
                case 'GET':
                    successGetGaleriePictures(dispatch, getState, action);
                    break;
                default:
                    successDefaultMethod(dispatch, getState, action);
            }
        }
    };

export default successGaleriePicturesMiddleware;
