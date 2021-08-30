import { Middleware } from 'redux';

import {
    apiRequest,
    API_SUCCESS,
    FRAMES,
    FRAMES_FETCH,
    normalizeData,
    setFrames,
    setGaleries,
    setNotification,
} from '#store/actions';
import { END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import uniqueArray from '#helpers/uniqueArray';

const fetchFrames: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${FRAMES_FETCH}`) {
            const galerieId =
                action.payload.meta.query &&
                typeof action.payload.meta.query.galerieId === 'string' &&
                action.payload.meta.query.galerieId !== ''
                    ? action.payload.meta.query.galerieId
                    : null;
            const galerie = galerieId
                ? getState().galeries.byId[galerieId]
                : undefined;
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
                                status: 'PENDING',
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
            if (
                action.payload.data.data &&
                action.payload.data.data.frames &&
                Array.isArray(action.payload.data.data.frames)
            ) {
                switch (action.payload.meta.method) {
                    case 'GET':
                        {
                            const galerieId =
                                action.payload.meta.query &&
                                typeof action.payload.meta.query.galerieId ===
                                    'string'
                                    ? action.payload.meta.query.galerieId
                                    : null;
                            const galerie = galerieId
                                ? getState().galeries.byId[galerieId]
                                : undefined;
                            if (galerieId && galerie) {
                                const newAllIds: string[] = [];
                                const byId: {
                                    [key: string]: Store.Models.Frame;
                                } = {};
                                action.payload.data.data.frames.forEach(
                                    (
                                        frame: Store.Models.Frame & {
                                            id: string;
                                        }
                                    ) => {
                                        const { id, ...rest } = frame;
                                        newAllIds.push(id);
                                        byId[id] = rest;
                                    }
                                );
                                const framesById = {
                                    ...getState().frames.byId,
                                    ...byId,
                                };
                                const allIds = uniqueArray([
                                    ...galerie.frames.allIds,
                                    ...newAllIds,
                                ]).sort((a, b) => {
                                    if (!framesById[a] || !framesById[b])
                                        return 0;
                                    return (
                                        new Date(
                                            framesById[a].createdAt
                                        ).getTime() -
                                        new Date(
                                            framesById[b].createdAt
                                        ).getTime()
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
                                        data: {
                                            byId,
                                        },
                                    })
                                );
                            } else {
                                dispatch(
                                    normalizeData({
                                        data: action.payload.data.data.frames,
                                        meta: {
                                            ...action.payload.meta,
                                            end:
                                                action.payload.data.data.frames
                                                    .length < 20,
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
            } else {
                dispatch(
                    setNotification({
                        status: 'error',
                        text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                    })
                );
            }
        }
    };

export default [fetchFrames, successFrames];
