import { combineReducers, Dispatch, Middleware } from 'redux';

import { createSelector } from 'reselect';
import {
    BY_ID,
    GET,
    LIKES,
    POST,
    REMOVE,
    RESET,
    SET,
} from '#store/genericActionTypes';
import { apiRequest, API_ERROR, API_SUCCESS } from '#store/api';
import { updateFramesById } from '#store/frames';
import { dispatchErrorNotification } from '#store/notification';
import { END_POINT, ERROR_MESSAGE } from '#helpers/constants';

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Action types
// ----------------------------------
// ----------------------------------
// ----------------------------------
const LIKES_GET = `${LIKES} ${GET}`;
const LIKES_POST = `${LIKES} ${POST}`;
const LIKES_RESET = `${LIKES} ${RESET}`;

const LIKES_BY_ID_REMOVE = `${LIKES}${BY_ID} ${REMOVE}`;
const LIKES_BY_ID_RESET = `${LIKES}${BY_ID} ${RESET}`;
const LIKES_BY_ID_SET = `${LIKES}${BY_ID} ${SET}`;

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Action creators
// ----------------------------------
// ----------------------------------
// ----------------------------------
export const getLikeId: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: LIKES_GET,
});
export const geFrameLikes: (frameId: string) => Store.Action = (frameId) => ({
    meta: { query: { frameId } },
    payload: {},
    type: LIKES_GET,
});
export const postLike: (frameId: string) => Store.Action = (frameId) => ({
    meta: { query: { frameId } },
    payload: {},
    type: LIKES_POST,
});
export const resetLikes: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: LIKES_RESET,
});

const removeLikesById: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: LIKES_BY_ID_REMOVE,
});
const resetLikesById: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: LIKES_BY_ID_RESET,
});
const setLikesById: (payload: {
    [key: string]: Store.Models.Like;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: LIKES_BY_ID_SET,
});

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Dispatchers
// ----------------------------------
// ----------------------------------
// ----------------------------------
const dispatchFrameLikes = (
    dispatch: Dispatch<Store.Action>,
    frame: Store.Models.Frame,
    likes: {
        allIds?: string[];
        end?: boolean;
        previous?: string;
        status?: Store.Status;
    }
) => {
    const defaultLikes: typeof frame.likes = {
        allIds: [],
        end: false,
        status: 'PENDING',
    };
    dispatch(
        updateFramesById({
            ...frame,
            likes: {
                ...(frame.comments || defaultLikes),
                ...likes,
            },
        })
    );
};
const dispatchFrame = (
    dispatch: Dispatch<Store.Action>,
    frame: Store.Models.Frame,
    data: { liked: boolean; numOfLikes: string }
) => {
    dispatch(
        updateFramesById({
            ...frame,
            ...data,
        })
    );
};
const dispatchGetFrameLikes = (
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
                entity: LIKES,
                url: `${END_POINT.LIKES(frameId)}${query}`,
            },
            payload: {},
        })
    );
};
const dispatchGetFrame = (dispatch: Dispatch<Store.Action>, likeId: string) => {
    dispatch(
        apiRequest({
            meta: {
                method: 'GET',
                entity: LIKES,
                url: END_POINT.LIKE_ID(likeId),
            },
            payload: {},
        })
    );
};
const dispatchPostLike = (
    dispatch: Dispatch<Store.Action>,
    frameId: string
) => {
    dispatch(
        apiRequest({
            meta: {
                query: { frameId },
                method: 'POST',
                entity: LIKES,
                url: END_POINT.LIKES(frameId),
            },
            payload: {},
        })
    );
};

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Middlewared
// ----------------------------------
// ----------------------------------
// ----------------------------------
const getFrame = (getState: () => Store.Reducer, frameId: string) =>
    getState().frames.byId[frameId];
const getMeId = (getState: () => Store.Reducer) => getState().me.id;

const errorLikesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${LIKES} ${API_ERROR}`) {
            const frameId = action.payload.query
                ? action.payload.query.frameId
                : undefined;
            if (typeof frameId === 'string') {
                const frame = getFrame(getState, frameId);
                if (frame)
                    dispatchFrameLikes(dispatch, frame, { status: 'ERROR' });
            }
            dispatchErrorNotification(dispatch, action);
        }
    };
const getLikesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === LIKES_GET) {
            const frameId = action.meta.query
                ? action.meta.query.frameId
                : undefined;
            if (typeof frameId === 'string') {
                const frame = getFrame(getState, frameId);
                if (frame) {
                    const end = frame.likes ? frame.likes.end : false;
                    const previous = frame.likes ? frame.likes.previous : '';
                    const status = frame.likes ? frame.likes.status : 'PENDING';
                    if (!end && !status.includes('LOADING')) {
                        const newStatus =
                            status === 'PENDING'
                                ? 'INITIAL_LOADING'
                                : 'LOADING';
                        dispatchFrameLikes(dispatch, frame, {
                            status: newStatus,
                        });
                        dispatchGetFrameLikes(
                            dispatch,
                            frameId,
                            previous || ''
                        );
                    }
                }
            } else if (action.payload === 'string')
                dispatchGetFrame(dispatch, action.payload);
        }
    };
const postLikesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === LIKES_POST) {
            const frameId = action.meta.query
                ? action.meta.query.frameId
                : undefined;
            if (typeof frameId === 'string') {
                const frame = getFrame(getState, frameId);
                if (frame) dispatchPostLike(dispatch, frameId);
            }
        }
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
            dispatchFrameLikes(dispatch, frame, {
                status: 'ERROR',
            });
    }
    dispatchErrorNotification(dispatch, ERROR_MESSAGE.METHOD_NOT_FOUND);
};
const successGetLikes = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const frameId = action.meta.query ? action.meta.query.frameId : undefined;
    if (typeof frameId === 'string') {
        const frame = getFrame(getState, frameId);
        if (frame) {
            const allIds: string[] = [];
            const byId: { [key: string]: Store.Models.Like } = {};
            const { likes } = action.payload.data.data;
            if (likes && Array.isArray(likes))
                likes.forEach((l) => {
                    allIds.push(l.id);
                    byId[l.id] = l;
                });
            dispatch(setLikesById(byId));
            if (allIds.length) {
                const previousLikeId = allIds[allIds.length - 1];
                const previous = byId[previousLikeId].autoIncrementId;
                dispatchFrameLikes(dispatch, frame, {
                    allIds,
                    end: allIds.length < 20,
                    previous,
                    status: 'SUCCESS',
                });
            }
        }
    }
};
const successPostLikes = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const frameId = action.meta.query ? action.meta.query.frameId : undefined;
    if (frameId) {
        const frame = getFrame(getState, frameId);
        if (frame) {
            const { liked, numOfLikes } = action.payload.data.data;
            dispatchFrame(dispatch, frame, { liked, numOfLikes });
            if (!liked) {
                const meId = getMeId(getState);
                const likes = Object.values(getState().likes.byId).filter(
                    (like) => like.frameId === frameId && like.userId === meId
                );
                if (likes[0]) {
                    dispatch(removeLikesById(likes[0].id));
                    const allIds = frame.likes ? frame.likes.allIds : [];
                    if (allIds.length) {
                        allIds.filter((id) => id !== likes[0].id);
                        dispatchFrameLikes(dispatch, frame, {
                            allIds,
                        });
                    }
                }
            }
            // TODO: remove liked from frame where like.userId === me.id
        }
    }
};
const resetLikesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === LIKES_RESET) dispatch(resetLikesById());
    };
const successLikesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${LIKES} ${API_SUCCESS}`) {
            switch (action.meta.method) {
                case 'GET':
                    successGetLikes(dispatch, getState, action);
                    break;
                case 'POST':
                    successPostLikes(dispatch, getState, action);
                    break;
                default:
                    successDefaultMethod(dispatch, getState, action);
                    break;
            }
        }
    };

export const likesMiddlewares = [
    errorLikesMiddleware,
    getLikesMiddleware,
    postLikesMiddleware,
    resetLikesMiddleware,
    successLikesMiddleware,
];

const likesByIdInitialState: { [key: string]: Store.Models.Like } = {};
const likesByIdReducer = (
    state = likesByIdInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case LIKES_BY_ID_REMOVE: {
            const newState = { ...state };
            delete newState[action.payload];
            return newState;
        }
        case LIKES_BY_ID_RESET:
            return likesByIdInitialState;
        case LIKES_BY_ID_SET:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export const likesReducers = combineReducers({
    byId: likesByIdReducer,
});

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Selectors
// ----------------------------------
// ----------------------------------
// ----------------------------------
const selectFramesCurrent = (state: Store.Reducer) => state.frames.current;
const selectFramesById = (state: Store.Reducer) => state.frames.byId;
const selectLikesById = (state: Store.Reducer) => state.likes.byId;

export const selectCurrentFrameLikes = createSelector(
    [selectFramesCurrent, selectFramesById, selectLikesById],
    (framesCurrent, framesById, likesById) => {
        if (!framesCurrent) return undefined;
        const currentFrame = framesById[framesCurrent];
        if (!currentFrame || !currentFrame.likes) return undefined;
        return currentFrame.likes.allIds
            .map((id) => likesById[id])
            .filter((like) => !!like);
    }
);
export const selectCurrentFrameLikesStatus = createSelector(
    [selectFramesById, selectFramesCurrent],
    (framesById, framesCurrent) => {
        if (!framesCurrent) return undefined;
        const frame = framesById[framesCurrent];
        if (!frame || !frame.likes) return undefined;
        return frame.likes.status;
    }
);
export const selectFrameLikes = (frameId: string) =>
    createSelector(
        [selectFramesById, selectLikesById],
        (framesById, likesById) => {
            const frame = framesById[frameId];
            if (!frame || !frame.likes) return undefined;
            return frame.likes.allIds
                .map((id) => likesById[id])
                .filter((like) => !!like);
        }
    );
export const selectLike = (likeId: string) =>
    createSelector([selectLikesById], (likesById) => likesById[likeId]);
