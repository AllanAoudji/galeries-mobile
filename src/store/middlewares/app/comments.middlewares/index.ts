import { Middleware } from 'redux';

import {
    API_SUCCESS,
    COMMENTS,
    COMMENTS_FETCH,
    apiRequest,
    setFrames,
    setNotification,
    setComments,
} from '#store/actions';
import { END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import normalizeData from '#helpers/normalizeData';
import uniqueArray from '#helpers/uniqueArray';

const fetchComments: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${COMMENTS_FETCH}`) {
            let allowRequest: boolean = false;
            let previousComment;
            const frameId =
                action.payload.meta.query &&
                typeof action.payload.meta.query.frameId === 'string'
                    ? action.payload.meta.query.frameId
                    : null;
            const frame = frameId ? getState().frames.byId[frameId] : undefined;
            if (frame) {
                allowRequest = frame.comments.end;
                previousComment = frame.comments.previousComment;
            }
            if (!allowRequest && frameId && frame) {
                const query = `?previousComment=${previousComment}`;
                dispatch(
                    setFrames({
                        data: {
                            byId: {
                                [frameId]: {
                                    ...frame,
                                    comments: {
                                        ...frame.comments,
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
                            entity: COMMENTS,
                            method: 'GET',
                            url: `${END_POINT.COMMENTS(frameId)}${query}`,
                        },
                    })
                );
            }
        }
    };

const successComments: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${COMMENTS} ${API_SUCCESS}`) {
            switch (action.payload.meta.method) {
                case 'GET': {
                    let normalize;
                    if (
                        action.payload.data.data.comments &&
                        Array.isArray(action.payload.data.data.comments)
                    ) {
                        normalize = normalizeData(
                            action.payload.data.data.comments
                        );
                    } else if (
                        action.payload.data.data.comment &&
                        typeof action.payload.data.data.comment === 'object'
                    ) {
                        normalize = normalizeData(
                            action.payload.data.data.comment
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
                        const commentsById = {
                            ...getState().comments.byId,
                            ...normalize.byId,
                        };
                        const allIds = uniqueArray([
                            ...(frame.comments.allIds || []),
                            ...normalize.allIds,
                        ]).sort((a, b) => {
                            if (!commentsById[a] || !commentsById[b]) return 0;
                            return (
                                new Date(commentsById[b].createdAt).getTime() -
                                new Date(commentsById[a].createdAt).getTime()
                            );
                        });
                        const previousComment = allIds[allIds.length - 1];
                        dispatch(
                            setFrames({
                                data: {
                                    byId: {
                                        [frameId]: {
                                            ...frame,
                                            comments: {
                                                allIds,
                                                end: allIds.length < 20,
                                                status: 'SUCCESS',
                                                previousComment,
                                            },
                                        },
                                    },
                                },
                            })
                        );
                        dispatch(
                            setComments({
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

export default [fetchComments, successComments];
