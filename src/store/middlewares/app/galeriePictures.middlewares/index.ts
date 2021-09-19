import { Middleware } from 'redux';

import {
    apiRequest,
    API_SUCCESS,
    GALERIE_PICTURES,
    GALERIE_PICTURES_FETCH,
    setFrames,
    setGaleriePictures,
    setNotification,
} from '#store/actions';
import { END_POINT } from '#helpers/constants';
import normalizeData from '#helpers/normalizeData';

const extractFrame: (
    action: Store.Action,
    getState: () => Store.Reducer
) => {
    frame: Store.Models.Frame | undefined;
    frameId: string | null;
} = (action, getState) => {
    const frameId =
        action.payload.meta.query &&
        typeof action.payload.meta.query.frameId === 'string'
            ? action.payload.meta.query.frameId
            : null;
    const frame = frameId ? getState().frames.byId[frameId] : undefined;
    return {
        frame,
        frameId,
    };
};

const fetchGaleriePictures: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${GALERIE_PICTURES_FETCH}`) {
            const { frame, frameId } = extractFrame(action, getState);
            if (frameId && frame && !frame.galeriePicturesId) {
                dispatch(
                    apiRequest({
                        data: {},
                        meta: {
                            ...action.payload.meta,
                            entity: GALERIE_PICTURES,
                            method: 'GET',
                            url: END_POINT.FRAMES_GALERIE_PICTURES(frameId),
                        },
                    })
                );
            }
        }
    };

const successGaleriePictures: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${GALERIE_PICTURES} ${API_SUCCESS}`) {
            switch (action.payload.meta.method) {
                case 'GET':
                    if (
                        action.payload.data.data &&
                        action.payload.data.data.galeriePictures
                    ) {
                        const { frame, frameId } = extractFrame(
                            action,
                            getState
                        );
                        if (frame && frameId) {
                            const normalize = normalizeData(
                                action.payload.data.data
                                    .galeriePictures as Store.Models.GaleriePicture
                            );
                            dispatch(
                                setGaleriePictures({
                                    byId: normalize.byId,
                                })
                            );
                            dispatch(
                                setFrames({
                                    data: {
                                        byId: {
                                            [frameId]: {
                                                ...frame,
                                                galeriePicturesId:
                                                    normalize.allIds,
                                            },
                                        },
                                    },
                                })
                            );
                        }
                    }
                    break;
                default:
                    dispatch(
                        setNotification({
                            status: 'error',
                            text: 'Method not found',
                        })
                    );
            }
        }
    };

export default [fetchGaleriePictures, successGaleriePictures];
