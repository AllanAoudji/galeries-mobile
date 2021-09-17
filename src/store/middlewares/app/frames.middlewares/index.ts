import { Middleware } from 'redux';

import {
    apiRequest,
    API_SUCCESS,
    FRAMES,
    FRAMES_FETCH,
    setFrames,
    setGaleriePictures,
    setGaleries,
    setNotification,
} from '#store/actions';
import { END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import normalizeData from '#helpers/normalizeData';
import uniqueArray from '#helpers/uniqueArray';
import normalizeFrame from '#helpers/normalizeFrame';

const extractGalerie: (
    action: Store.Action,
    getState: () => Store.Reducer
) => {
    galerie: Store.Models.Galerie | undefined;
    galerieId: string | null;
} = (action, getState) => {
    const galerieId =
        action.payload.meta.query &&
        typeof action.payload.meta.query.galerieId === 'string'
            ? action.payload.meta.query.galerieId
            : null;
    const galerie = galerieId ? getState().galeries.byId[galerieId] : undefined;
    return {
        galerie,
        galerieId,
    };
};

const fetchFrames: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${FRAMES_FETCH}`) {
            const { galerie, galerieId } = extractGalerie(action, getState);
            let allowRequest: boolean;
            let previousFrame = '';
            if (galerieId) {
                if (galerie) {
                    allowRequest = galerie.frames.end;
                    previousFrame = galerie.frames.previousFrame || '';
                } else allowRequest = false;
            } else {
                allowRequest = getState().frames.end;
                previousFrame = getState().frames.previousFrame || '';
            }
            if (!allowRequest) {
                const query = `?previousFrame=${previousFrame}`;
                if (galerieId && galerie) {
                    dispatch(
                        setGaleries({
                            data: {
                                byId: {
                                    [galerieId]: {
                                        ...galerie,
                                        frames: {
                                            ...galerie.frames,
                                            status: 'FETCHING',
                                        },
                                    },
                                },
                            },
                        })
                    );
                } else {
                    dispatch(
                        setFrames({
                            data: {
                                status: 'FETCHING',
                            },
                        })
                    );
                }
                const url = galerieId
                    ? END_POINT.GALERIE_FRAMES(galerieId)
                    : END_POINT.FRAMES;
                dispatch(
                    apiRequest({
                        data: {},
                        meta: {
                            ...action.payload.meta,
                            entity: FRAMES,
                            method: 'GET',
                            url: `${url}${query}`,
                        },
                    })
                );
            }
        }
    };

const successFrames: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${FRAMES} ${API_SUCCESS}`) {
            switch (action.payload.meta.method) {
                case 'GET':
                    if (action.payload.data.data) {
                        let normalize;
                        if (
                            action.payload.data.data.frames &&
                            Array.isArray(action.payload.data.data.frames)
                        ) {
                            const { galeriePicturesById, normalizedFrames } =
                                normalizeFrame(action.payload.data.data.frames);
                            normalize = normalizeData(normalizedFrames);
                            dispatch(
                                setGaleriePictures({
                                    byId: galeriePicturesById,
                                })
                            );
                        } else if (
                            action.payload.data.data.frame &&
                            typeof action.payload.data.data.frame === 'object'
                        ) {
                            const { galeriePicturesById, normalizedFrames } =
                                normalizeFrame(action.payload.data.data.frame);
                            normalize = normalizeData(normalizedFrames);
                            dispatch(
                                setGaleriePictures({
                                    byId: galeriePicturesById,
                                })
                            );
                        } else {
                            dispatch(
                                setNotification({
                                    status: 'error',
                                    text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                                })
                            );
                            break;
                        }
                        const { galerie, galerieId } = extractGalerie(
                            action,
                            getState
                        );
                        if (galerie && galerieId) {
                            const framesById = {
                                ...getState().frames.byId,
                                ...normalize.byId,
                            };
                            const allIds = uniqueArray([
                                ...(galerie.frames.allIds || []),
                                ...normalize.allIds,
                            ]).sort((a, b) => {
                                if (!framesById[a] || !framesById[b]) return 0;
                                return (
                                    new Date(
                                        framesById[b].createdAt
                                    ).getTime() -
                                    new Date(framesById[a].createdAt).getTime()
                                );
                            });
                            const previousFrame = allIds[allIds.length - 1];
                            dispatch(
                                setGaleries({
                                    data: {
                                        byId: {
                                            [galerieId]: {
                                                ...galerie,
                                                frames: {
                                                    allIds,
                                                    end: allIds.length < 20,
                                                    status: 'SUCCESS',
                                                    previousFrame,
                                                },
                                            },
                                        },
                                    },
                                })
                            );
                            dispatch(
                                setFrames({
                                    data: { byId: normalize.byId },
                                })
                            );
                        } else {
                            dispatch(
                                setFrames({
                                    data: {
                                        ...normalize,
                                        status: 'SUCCESS',
                                    },
                                    meta: {
                                        ...action.payload.meta,
                                        end: normalize.allIds.length < 20,
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

export default [fetchFrames, successFrames];
