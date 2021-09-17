import { Middleware } from 'redux';

import { END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import normalizeData from '#helpers/normalizeData';
import uniqueArray from '#helpers/uniqueArray';
import {
    API_SUCCESS,
    LIKES,
    LIKES_FETCH,
    apiRequest,
    setFrames,
    setLikes,
    setNotification,
} from '#store/actions';

// TODO: errorLikes

const fetchLikes: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${LIKES_FETCH}`) {
            let allowRequest: boolean = false;
            let previousLike;
            const frameId =
                action.payload.meta.query &&
                typeof action.payload.meta.query.frameId === 'string'
                    ? action.payload.meta.query.frameId
                    : null;
            const frame = frameId ? getState().frames.byId[frameId] : undefined;
            if (frame) {
                allowRequest = frame.likes.end;
                previousLike = frame.likes.previousLike;
            }
            if (!allowRequest && frameId && frame) {
                const query = `?previousLike=${previousLike}`;
                dispatch(
                    setFrames({
                        data: {
                            byId: {
                                [frameId]: {
                                    ...frame,
                                    likes: {
                                        ...frame.likes,
                                        status: 'FETCHING',
                                    },
                                },
                            },
                        },
                    })
                );
                dispatch(
                    apiRequest({
                        data: {},
                        meta: {
                            ...action.payload.meta,
                            entity: LIKES,
                            method: 'GET',
                            url: `${END_POINT.LIKES(frameId)}${query}`,
                        },
                    })
                );
            }
        }
    };

const successLikes: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${LIKES} ${API_SUCCESS}`) {
            switch (action.payload.meta.method) {
                case 'GET': {
                    let normalize;
                    if (
                        action.payload.data.data.likes &&
                        Array.isArray(action.payload.data.data.likes)
                    ) {
                        normalize = normalizeData(
                            action.payload.data.data
                                .likes as Store.Models.Like[]
                        );
                    } else if (
                        action.payload.data.data.like &&
                        typeof action.payload.data.data.like === 'object'
                    ) {
                        normalize = normalizeData(
                            action.payload.data.data.like as Store.Models.Like
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
                    const frameId =
                        action.payload.meta.query &&
                        typeof action.payload.meta.query.frameId === 'string'
                            ? action.payload.meta.query.frameId
                            : null;
                    const frame = frameId
                        ? getState().frames.byId[frameId]
                        : undefined;
                    if (frameId && frame) {
                        const likesById = {
                            ...getState().likes.byId,
                            ...normalize.byId,
                        };
                        const allIds = uniqueArray([
                            ...(frame.likes.allIds || []),
                            ...normalize.allIds,
                        ]).sort((a, b) => {
                            if (!likesById[a] || !likesById[b]) return 0;
                            return (
                                new Date(likesById[b].createdAt).getTime() -
                                new Date(likesById[a].createdAt).getTime()
                            );
                        });
                        const previousLike = likesById[
                            allIds[allIds.length - 1]
                        ]
                            ? likesById[allIds[allIds.length - 1]]
                                  .autoIncrementId
                            : undefined;
                        dispatch(
                            setFrames({
                                data: {
                                    byId: {
                                        [frameId]: {
                                            ...frame,
                                            likes: {
                                                allIds,
                                                end:
                                                    normalize.allIds.length <
                                                    20,
                                                status: 'SUCCESS',
                                                previousLike,
                                            },
                                        },
                                    },
                                },
                            })
                        );
                        dispatch(
                            setLikes({
                                data: { byId: normalize.byId },
                            })
                        );
                    }
                    break;
                }
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

export default [fetchLikes, successLikes];
