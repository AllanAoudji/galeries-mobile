import { combineReducers, Dispatch, Middleware } from 'redux';
import { createSelector } from 'reselect';
import {
    BY_ID,
    COMMENTS,
    DELETE,
    GET,
    POST,
    PUT,
    RESET,
    REMOVE,
    SET,
} from '#store/genericActionTypes';
import { apiRequest, API_ERROR, API_SUCCESS } from '#store/api';
import { END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import { updateFramesById } from '#store/frames';
import { dispatchErrorNotification } from '#store/notification';
import { setLoading } from '#store/loading';

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Action types
// ----------------------------------
// ----------------------------------
// ----------------------------------
const COMMENTS_DELETE = `${COMMENTS} ${DELETE}`;
const COMMENTS_GET = `${COMMENTS} ${GET}`;
const COMMENTS_POST = `${COMMENTS} ${POST}`;
const COMMENTS_PUT = `${COMMENTS} ${PUT}`;
const COMMENTS_RESET = `${COMMENTS} ${RESET}`;

const COMMENTS_BY_ID_REMOVE = `${COMMENTS}${BY_ID} ${REMOVE}`;
const COMMENTS_BY_ID_RESET = `${COMMENTS}${BY_ID} ${RESET}`;
const COMMENTS_BY_ID_SET = `${COMMENTS}${BY_ID} ${SET}`;

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Action creators
// ----------------------------------
// ----------------------------------
// ----------------------------------
export const deleteComment: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: COMMENTS_DELETE,
});
export const getCommentId: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: COMMENTS_GET,
});
export const getFrameComments: (frameId: string) => Store.Action = (
    frameId
) => ({
    meta: { query: { frameId } },
    payload: {},
    type: COMMENTS_GET,
});
export const postComment: (
    payload: { body: string },
    frameId: string
) => Store.Action = (payload, frameId) => ({
    meta: { query: { frameId } },
    payload,
    type: COMMENTS_POST,
});
export const putComment: (
    payload: { body: string },
    commentId: string
) => Store.Action = (payload, commentId) => ({
    meta: { query: { commentId } },
    payload,
    type: COMMENTS_PUT,
});
export const resetComments: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: COMMENTS_RESET,
});

const removeCommentsById: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: COMMENTS_BY_ID_REMOVE,
});
const resetCommentsById: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: COMMENTS_BY_ID_RESET,
});
const setCommentsById: (payload: {
    [key: string]: Store.Models.Comment;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: COMMENTS_BY_ID_SET,
});

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Dispatchers
// ----------------------------------
// ----------------------------------
// ----------------------------------
const dispatchDeleteComment = (
    dispatch: Dispatch<Store.Action>,
    frameId: string,
    commentId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                query: { frameId },
                entity: COMMENTS,
                method: 'DELETE',
                url: END_POINT.COMMENT_ID(commentId),
            },
            payload: {},
        })
    );
};
const dispatchFrameComments = (
    dispatch: Dispatch<Store.Action>,
    frame: Store.Models.Frame,
    comments: {
        allIds?: string[];
        end?: boolean;
        previous?: string;
        status?: Store.Status;
    }
) => {
    const defaultComments: typeof frame.comments = {
        allIds: [],
        end: false,
        status: 'PENDING',
    };
    dispatch(
        updateFramesById({
            ...frame,
            comments: {
                ...(frame.comments || defaultComments),
                ...comments,
            },
        })
    );
};
const dispatchGetComment = (
    dispatch: Dispatch<Store.Action>,
    commentId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                method: 'GET',
                entity: COMMENTS,
                url: END_POINT.COMMENT_ID(commentId),
            },
            payload: {},
        })
    );
};
const dispatchGetFrameComments = (
    dispatch: Dispatch<Store.Action>,
    frameId: string,
    previous: string
) => {
    const query = `?previous=${previous}`;
    dispatch(
        apiRequest({
            meta: {
                query: { frameId },
                method: 'GET',
                entity: COMMENTS,
                url: `${END_POINT.FRAME_COMMENTS(frameId)}${query}`,
            },
            payload: {},
        })
    );
};
const dispatchPostFrameComments = (
    dispatch: Dispatch<Store.Action>,
    frameId: string,
    payload: { body: string }
) => {
    dispatch(
        apiRequest({
            meta: {
                query: { frameId },
                method: 'POST',
                entity: COMMENTS,
                url: END_POINT.FRAME_COMMENTS(frameId),
            },
            payload,
        })
    );
};
const dispatchPutComment = (
    dispatch: Dispatch<Store.Action>,
    commentId: string,
    payload: { body: string }
) => {
    dispatch(
        apiRequest({
            meta: {
                method: 'PUT',
                entity: COMMENTS,
                url: END_POINT.COMMENT_ID(commentId),
            },
            payload,
        })
    );
};
const dispatchDeleteFrameComment = (
    dispatch: Dispatch<Store.Action>,
    frame: Store.Models.Frame,
    commentId: string
) => {
    const allIds = frame.comments ? frame.comments.allIds : [];
    if (allIds.length) {
        const newAllIds = allIds.filter((id) => id !== commentId);
        const defaultComments: {
            allIds: string[];
            end: boolean;
            previous?: string | undefined;
            status: Store.Status;
        } = {
            allIds: [],
            end: false,
            status: 'PENDING',
        };
        dispatch(
            updateFramesById({
                ...frame,
                comments: {
                    ...(frame.comments || defaultComments),
                    allIds: newAllIds,
                },
            })
        );
    }
};

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Middlewared
// ----------------------------------
// ----------------------------------
// ----------------------------------
const getComment = (getState: () => Store.Reducer, commentId: string) =>
    getState().comments.byId[commentId];
const getFrame = (getState: () => Store.Reducer, frameId: string) =>
    getState().frames.byId[frameId];

const deleteCommentMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (
            typeof action.payload === 'string' &&
            action.type === COMMENTS_DELETE
        ) {
            const comment = getComment(getState, action.payload);
            if (comment) {
                dispatch(setLoading(true));
                dispatchDeleteComment(
                    dispatch,
                    comment.frameId,
                    action.payload
                );
            }
        }
    };
const errorCommentsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${COMMENTS} ${API_ERROR}`) {
            const frameId = action.payload.query
                ? action.payload.query.frameId
                : undefined;
            if (typeof frameId === 'string') {
                const frame = getFrame(getState, frameId);
                if (frame)
                    dispatchFrameComments(dispatch, frame, {
                        status: 'ERROR',
                    });
            }
            dispatch(setLoading(false));
            dispatchErrorNotification(dispatch, action);
        }
    };
const getCommentsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === COMMENTS_GET) {
            const frameId = action.meta.query
                ? action.meta.query.frameId
                : undefined;
            if (typeof frameId === 'string') {
                const frame = getFrame(getState, frameId);
                if (frame) {
                    const end = frame.comments ? frame.comments.end : false;
                    const previous = frame.comments
                        ? frame.comments.previous
                        : '';
                    const status = frame.comments
                        ? frame.comments.status
                        : 'PENDING';
                    if (!end && !status.includes('LOADING')) {
                        const newStatus =
                            status === 'PENDING'
                                ? 'INITIAL_LOADING'
                                : 'LOADING';
                        dispatchFrameComments(dispatch, frame, {
                            status: newStatus,
                        });
                        dispatchGetFrameComments(
                            dispatch,
                            frameId,
                            previous || ''
                        );
                    }
                }
            } else if (typeof action.payload === 'string')
                dispatchGetComment(dispatch, action.payload);
        }
    };
const postCommentMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === COMMENTS_POST) {
            const frameId = action.meta.query
                ? action.meta.query.frameId
                : undefined;
            const body =
                typeof action.payload === 'object'
                    ? action.payload.body
                    : undefined;
            if (typeof frameId === 'string' && typeof body === 'string') {
                const frame = getFrame(getState, frameId);
                if (frame) {
                    dispatch(setLoading(true));
                    dispatchPostFrameComments(
                        dispatch,
                        frameId,
                        action.payload
                    );
                }
            }
        }
    };
const putCommentMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === COMMENTS_PUT) {
            const commentId = action.meta.query
                ? action.meta.query.commentId
                : undefined;
            const body =
                typeof action.payload === 'object'
                    ? action.payload.body
                    : undefined;
            if (typeof commentId === 'string' && typeof body === 'string') {
                const comment = getComment(getState, commentId);
                if (comment) {
                    dispatch(setLoading(true));
                    dispatchPutComment(dispatch, commentId, action.payload);
                }
            }
        }
    };
const resetCommentsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === COMMENTS_RESET) dispatch(resetCommentsById());
    };
const successDefaultMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const frameId = action.meta.query ? action.meta.query.frameId : undefined;
    if (typeof frameId === 'string') {
        const frame = getFrame(getState, frameId);
        if (frame)
            dispatchFrameComments(dispatch, frame, {
                status: 'ERROR',
            });
    }
    dispatchErrorNotification(dispatch, ERROR_MESSAGE.METHOD_NOT_FOUND);
};
const successDeleteComment = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const { commentId } = action.payload.data.data;
    if (typeof commentId === 'string') {
        const comment = getComment(getState, commentId);
        if (comment) {
            dispatch(removeCommentsById(commentId));
            const frame = getFrame(getState, comment.frameId);
            if (frame) dispatchDeleteFrameComment(dispatch, frame, commentId);
        }
    }
};
const successGetComments = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const allIds: string[] = [];
    const byId: { [key: string]: Store.Models.Comment } = {};
    const { comment, comments } = action.payload.data.data;
    if (comments && Array.isArray(comments))
        comments.forEach((c) => {
            allIds.push(c.id);
            byId[c.id] = c;
        });
    else if (comment && typeof comment === 'object') {
        allIds.push(comment.id);
        byId[comment.id] = comment;
    }
    dispatch(setCommentsById(byId));
    if (allIds.length) {
        const frameId = action.meta.query
            ? action.meta.query.frameId
            : undefined;
        const previousCommentId = allIds[allIds.length - 1];
        const previous = byId[previousCommentId].autoIncrementId;
        if (frameId) {
            const frame = getFrame(getState, frameId);
            if (frame)
                dispatchFrameComments(dispatch, frame, {
                    allIds,
                    end: allIds.length < 20,
                    previous,
                    status: 'SUCCESS',
                });
        }
    }
};
const successPostComments = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const comment = action.payload.data.data;
    if (comment && typeof comment === 'object') {
        const frameId = action.meta.query
            ? action.meta.query.frameId
            : undefined;
        const byId = { [comment.id]: comment };
        const allIds = [comment.id];
        dispatch(setCommentsById(byId));
        if (frameId) {
            const frame = getFrame(getState, frameId);
            if (frame) {
                dispatchFrameComments(dispatch, frame, {
                    allIds,
                });
            }
        }
    }
};
const successCommentsMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${COMMENTS} ${API_SUCCESS}`) {
            switch (action.meta.method) {
                case 'DELETE':
                    successDeleteComment(dispatch, getState, action);
                    break;
                case 'GET':
                    successGetComments(dispatch, getState, action);
                    break;
                case 'POST':
                    successPostComments(dispatch, getState, action);
                    break;
                default:
                    successDefaultMethod(dispatch, getState, action);
            }
            dispatch(setLoading(false));
        }
    };

export const commentsMiddlewares = [
    deleteCommentMiddleware,
    errorCommentsMiddleware,
    getCommentsMiddleware,
    postCommentMiddleware,
    putCommentMiddleware,
    resetCommentsMiddleware,
    successCommentsMiddleware,
];

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Reducers
// ----------------------------------
// ----------------------------------
// ----------------------------------
const commentsByIdInitialState: { [key: string]: Store.Models.Comment } = {};
const commentsByIdReducer = (
    state = commentsByIdInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case COMMENTS_BY_ID_REMOVE: {
            const newState = { ...state };
            delete newState[action.payload];
            return { ...newState };
        }
        case COMMENTS_BY_ID_RESET:
            return commentsByIdInitialState;
        case COMMENTS_BY_ID_SET:
            return {
                ...state,
                [action.payload.id]: action.payload,
            };
        default:
            return state;
    }
};

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Combined reducers
// ----------------------------------
// ----------------------------------
// ----------------------------------
export const commentsReducer = combineReducers({
    byId: commentsByIdReducer,
});

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Selectors
// ----------------------------------
// ----------------------------------
// ----------------------------------
const selectCommentsById = (state: Store.Reducer) => state.comments.byId;
const selectFramesCurrent = (state: Store.Reducer) => state.frames.current;
const selectFramesById = (state: Store.Reducer) => state.frames.byId;

export const selectCommentId = (id: string) =>
    createSelector([selectCommentsById], (commentsById) => commentsById[id]);
export const selectFrameComments = (id: string) =>
    createSelector(
        [selectCommentsById, selectFramesById],
        (commentsById, framesById) => {
            const frame = framesById[id];
            if (!frame || !frame.comments) return undefined;
            const { allIds } = frame.comments;
            return allIds
                .map((frameId) => commentsById[frameId])
                .filter((item) => !!item);
        }
    );
export const selectCurrentFrameComments = createSelector(
    [selectCommentsById, selectFramesCurrent, selectFramesById],
    (commentsById, framesCurrent, framesById) => {
        if (!framesCurrent) return undefined;
        const frame = framesById[framesCurrent];
        if (!frame || !frame.comments) return undefined;
        const { allIds } = frame.comments;
        return allIds
            .map((frameId) => commentsById[frameId])
            .filter((item) => !!item);
    }
);
export const selectCurrentFrameCommentsStatus = createSelector(
    [selectFramesById, selectFramesCurrent],
    (framesById, framesCurrent) => {
        if (!framesCurrent) return undefined;
        const frame = framesById[framesCurrent];
        if (!frame || !frame.comments) return undefined;
        return frame.comments.status;
    }
);
