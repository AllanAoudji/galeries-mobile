import { combineReducers, Dispatch, Middleware } from 'redux';

import { createSelector } from 'reselect';
import {
    ALL_IDS,
    BY_ID,
    CURRENT,
    DELETE,
    END,
    FIELDS_ERROR,
    FRAMES,
    GET,
    POST,
    PREVIOUS,
    PUT,
    REMOVE,
    RESET,
    SET,
    STATUS,
    UPDATE,
} from '#store/genericActionTypes';
import { apiRequest, API_ERROR, API_SUCCESS } from '#store/api';
import { END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import { dispatchErrorNotification } from '#store/notification';
import { updateGaleriesById } from '#store/galeries';
import { setLoading } from '#store/loading';

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Action types
// ----------------------------------
// ----------------------------------
// ----------------------------------
const FRAMES_DELETE = `${FRAMES} ${DELETE}`;
const FRAMES_GET = `${FRAMES} ${GET}`;
const FRAMES_POST = `${FRAMES} ${POST}`;
const FRAMES_PUT = `${FRAMES} ${PUT}`;
const FRAMES_RESET = `${FRAMES} ${RESET}`;

const FRAMES_ALL_IDS_REMOVE = `${FRAMES}${ALL_IDS} ${REMOVE}`;
const FRAMES_ALL_IDS_RESET = `${FRAMES}${ALL_IDS} ${RESET}`;
const FRAMES_ALL_IDS_SET = `${FRAMES}${ALL_IDS} ${SET}`;

const FRAMES_BY_ID_REMOVE = `${FRAMES}${BY_ID} ${REMOVE}`;
const FRAMES_BY_ID_RESET = `${FRAMES}${BY_ID} ${RESET}`;
const FRAMES_BY_ID_SET = `${FRAMES}${BY_ID} ${SET}`;
const FRAMES_BY_ID_UPDATE = `${FRAMES}${BY_ID} ${UPDATE}`;

const FRAMES_CURRENT_RESET = `${FRAMES}${CURRENT} ${RESET}`;
const FRAMES_CURRENT_UPDATE = `${FRAMES}${CURRENT} ${UPDATE}`;

const FRAMES_END_RESET = `${FRAMES}${END} ${RESET}`;
const FRAMES_END_UPDATE = `${FRAMES}${END} ${UPDATE}`;

const FRAMES_FIELDS_ERROR_RESET = `${FRAMES}${FIELDS_ERROR} ${RESET}`;
const FRAMES_FIELDS_ERROR_UPDATE = `${FRAMES}${FIELDS_ERROR} ${UPDATE}`;

const FRAMES_PREVIOUS_RESET = `${FRAMES}${PREVIOUS} ${RESET}`;
const FRAMES_PREVIOUS_UPDATE = `${FRAMES}${PREVIOUS} ${UPDATE}`;

const FRAMES_STATUS_RESET = `${FRAMES}${STATUS} ${RESET}`;
const FRAMES_STATUS_UPDATE = `${FRAMES}${STATUS} ${UPDATE}`;

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Action creators
// ----------------------------------
// ----------------------------------
// ----------------------------------
export const deleteFrame: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: FRAMES_DELETE,
});
export const getFrameId: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: FRAMES_GET,
});
export const getFrames: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: FRAMES_GET,
});
export const getGalerieFrames: (galerieId: string) => Store.Action = (
    galerieId
) => ({
    meta: { query: { galerieId } },
    payload: {},
    type: FRAMES_GET,
});
export const postFrame: (galerieId: string, payload: FormData) => Store.Action =
    (galerieId, payload) => ({
        meta: { query: { galerieId } },
        payload,
        type: FRAMES_POST,
    });
export const putFrame: (payload: {
    description: string;
    id: string;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: FRAMES_PUT,
});
export const resetFrames: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: FRAMES_RESET,
});
export const updateFramesCurrent: (payload: string | null) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: FRAMES_CURRENT_UPDATE,
});
export const resetFramesFieldsError: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: FRAMES_FIELDS_ERROR_RESET,
});
export const updateFramesById: (payload: Store.Models.Frame) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: FRAMES_BY_ID_UPDATE,
});
export const updateFramesFieldsError: (payload: {
    descritpion?: string;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: FRAMES_FIELDS_ERROR_UPDATE,
});

const removeFramesAllIds: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: FRAMES_ALL_IDS_REMOVE,
});
const resetFramesAllIds: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: FRAMES_ALL_IDS_RESET,
});
const setFramesAllIds: (payload: string[]) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: FRAMES_ALL_IDS_SET,
});

const removeFramesById: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: FRAMES_BY_ID_REMOVE,
});
const resetFramesById: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: FRAMES_BY_ID_RESET,
});
const setFramesById: (payload: {
    [key: string]: Store.Models.Frame;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: FRAMES_BY_ID_SET,
});

const resetFramesCurrent: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: FRAMES_CURRENT_RESET,
});

const resetFramesEnd: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: FRAMES_END_RESET,
});
const updateFramesEnd: (payload: boolean) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: FRAMES_END_UPDATE,
});

const resetFramesPrevious: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: FRAMES_PREVIOUS_RESET,
});
const updateFramesPrevious: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: FRAMES_PREVIOUS_UPDATE,
});

const resetFramesStatus: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: FRAMES_STATUS_RESET,
});
const updateFramesStatus: (payload: Store.Status) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: FRAMES_STATUS_UPDATE,
});

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Dispatchers
// ----------------------------------
// ----------------------------------
// ----------------------------------
const dispatchDeleteFrame: (
    dispatch: Dispatch<Store.Action>,
    frameId: string
) => void = (dispatch, frameId) => {
    dispatch(
        apiRequest({
            meta: {
                entity: FRAMES,
                method: 'DELETE',
                url: END_POINT.FRAME(frameId),
            },
            payload: {},
        })
    );
};
const dispatchGalerieIdFrames: (
    dispatch: Dispatch<Store.Action>,
    galerie: Store.Models.Galerie,
    frames: {
        allIds?: string[];
        end?: boolean;
        previous?: string | undefined;
        status?: Store.Status;
    }
) => void = (dispatch, galerie, frames) => {
    dispatch(
        updateGaleriesById({
            ...galerie,
            frames: {
                allIds: [
                    ...(galerie.frames ? galerie.frames.allIds : []),
                    ...(frames.allIds || []),
                ],
                ...galerie.frames,
                end:
                    frames.end || (galerie.frames ? galerie.frames.end : false),
                previous:
                    frames.previous ||
                    (galerie.frames ? galerie.frames.previous : undefined),
                status:
                    frames.status ||
                    (galerie.frames ? galerie.frames.status : 'PENDING'),
            },
        })
    );
};
const dispatchGalerieIdFramesStatus: (
    dispatch: Dispatch<Store.Action>,
    galerie: Store.Models.Galerie,
    status: Store.Status
) => void = (dispatch, galerie, status) => {
    dispatch(
        updateGaleriesById({
            ...galerie,
            frames: {
                ...(galerie.frames || {
                    allIds: [],
                    end: false,
                }),
                status,
            },
        })
    );
};
const dispatchDeleteGalerieIdFrames: (
    dispatch: Dispatch<Store.Action>,
    galerie: Store.Models.Galerie,
    frameId: string
) => void = (dispatch, galerie, frameId) => {
    const allIds = galerie.frames ? galerie.frames.allIds : [];
    if (allIds.length) {
        const newAllIds = allIds.filter((id) => id !== frameId);
        dispatch(
            updateGaleriesById({
                ...galerie,
                frames: {
                    ...(galerie.frames || {
                        end: false,
                        status: 'PENDING',
                    }),
                    allIds: newAllIds,
                },
            })
        );
    }
};
const dispatchGetGalerieFrames: (
    dispatch: Dispatch<Store.Action>,
    galerieId: string,
    previous: string
) => void = (dispatch, galerieId, previous) => {
    const query = `?previous=${previous}`;
    dispatch(
        apiRequest({
            meta: {
                query: { galerieId },
                entity: FRAMES,
                method: 'GET',
                url: `${END_POINT.GALERIE_FRAMES(galerieId)}${query}`,
            },
            payload: {},
        })
    );
};
const dispatchGetFrameId: (
    dispatch: Dispatch<Store.Action>,
    frameId: string
) => void = (dispatch, frameId) => {
    dispatch(
        apiRequest({
            meta: {
                entity: FRAMES,
                method: 'GET',
                url: END_POINT.FRAME(frameId),
            },
            payload: {},
        })
    );
};
const dispatchGetFrames: (
    dispatch: Dispatch<Store.Action>,
    previous: string
) => void = (dispatch, previous) => {
    const query = `?previous=${previous}`;
    dispatch(
        apiRequest({
            payload: {},
            meta: {
                entity: FRAMES,
                method: 'GET',
                url: `${END_POINT.FRAMES}${query}`,
            },
        })
    );
};
const dispatchPostFrame: (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => void = (dispatch, action) => {
    const galerieId = action.meta.query
        ? action.meta.query.galerieId
        : undefined;
    if (typeof galerieId === 'string')
        dispatch(
            apiRequest({
                meta: {
                    ...action.meta,
                    entity: FRAMES,
                    method: 'POST',
                    url: END_POINT.GALERIE_FRAMES(galerieId),
                },
                payload: action.payload,
            })
        );
};
const dispatchPutFrame: (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => void = (dispatch, action) => {
    dispatch(
        apiRequest({
            payload: {
                description: action.payload.description,
            },
            meta: {
                ...action.meta,
                entity: FRAMES,
                method: 'PUT',
                url: END_POINT.GALERIE(action.payload.id),
            },
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
const getFramesEnd = (getState: () => Store.Reducer) => getState().frames.end;
const getFramesPrevious = (getState: () => Store.Reducer) =>
    getState().frames.previous;
const getFramesStatus = (getState: () => Store.Reducer) =>
    getState().frames.status;
const getGalerie = (getState: () => Store.Reducer, galerieId: string) =>
    getState().galeries.byId[galerieId];

const deleteFramesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (
            typeof action.payload === 'string' &&
            action.type === FRAMES_DELETE
        ) {
            dispatch(setLoading(true));
            dispatchDeleteFrame(dispatch, action.payload);
        }
    };
const errorFramesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${FRAMES} ${API_ERROR}`) {
            if (
                typeof action.payload === 'object' &&
                typeof action.payload.description === 'string'
            ) {
                dispatch(updateFramesFieldsError(action.payload));
            } else {
                const galerieId = action.meta.query
                    ? action.meta.query.galerieId
                    : undefined;
                if (galerieId) {
                    const galerie = getGalerie(getState, galerieId);
                    if (galerie)
                        dispatchGalerieIdFramesStatus(
                            dispatch,
                            galerie,
                            'ERROR'
                        );
                } else dispatch(updateFramesStatus('ERROR'));
                dispatchErrorNotification(dispatch, action);
            }
            dispatch(setLoading(false));
        }
    };
const getFramesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === FRAMES_GET) {
            const galerieId = action.meta.query
                ? action.meta.query.galerieId
                : undefined;
            if (typeof action.payload === 'string')
                dispatchGetFrameId(dispatch, action.payload);
            else if (typeof galerieId === 'string') {
                const galerie = getGalerie(getState, galerieId);
                const end = galerie.frames ? galerie.frames.end : false;
                const status = galerie.frames
                    ? galerie.frames.status
                    : 'PENDING';
                if (!end && !status.includes('LOADING')) {
                    const newStatus: Store.Status =
                        status === 'PENDING' ? 'INITIAL_LOADING' : 'LOADING';
                    const previous = galerie.users
                        ? galerie.users.previousFrame || ''
                        : '';
                    dispatchGalerieIdFramesStatus(dispatch, galerie, newStatus);
                    dispatchGetGalerieFrames(dispatch, galerieId, previous);
                }
            } else {
                const end = getFramesEnd(getState);
                const status = getFramesStatus(getState);
                if (!end && !status.includes('LOADING')) {
                    const newStatus: Store.Status =
                        status === 'PENDING' ? 'INITIAL_LOADING' : 'LOADING';
                    const previous = getFramesPrevious(getState) || '';
                    dispatch(updateFramesStatus(newStatus));
                    dispatchGetFrames(dispatch, previous);
                }
            }
        }
    };
const postFramesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.payload instanceof FormData && action.type === FRAMES_POST) {
            dispatch(setLoading(true));
            dispatch(resetFramesFieldsError());
            dispatchPostFrame(dispatch, action);
        }
    };
const putFrameMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (
            action.type === FRAMES_PUT &&
            typeof action.payload.description === 'string' &&
            typeof action.payload.id === 'string'
        ) {
            dispatch(setLoading(true));
            dispatchPutFrame(dispatch, action);
        }
    };
const resetFramesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === FRAMES_RESET) {
            dispatch(resetFramesAllIds());
            dispatch(resetFramesById());
            dispatch(resetFramesCurrent());
            dispatch(resetFramesEnd());
            dispatch(resetFramesFieldsError());
            dispatch(resetFramesPrevious());
            dispatch(resetFramesStatus());
        }
    };
const successDefaultMethod = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const galerieId = action.meta.query
        ? action.meta.query.galerieId
        : undefined;
    if (typeof galerieId === 'string') {
        const galerie = getGalerie(getState, galerieId);
        if (galerie) dispatchGalerieIdFramesStatus(dispatch, galerie, 'ERROR');
    } else dispatch(updateFramesStatus('ERROR'));
    dispatchErrorNotification(dispatch, ERROR_MESSAGE.METHOD_NOT_FOUND);
};
const successDeleteFrame = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const { frameId } = action.payload.data.data;
    if (typeof frameId === 'string') {
        const frame = getFrame(getState, frameId);
        dispatch(removeFramesById(frameId));
        if (frame) {
            dispatch(resetFramesCurrent());
            dispatch(removeFramesAllIds(frameId));
            const galerie = getGalerie(getState, frame.galerieId);
            if (galerie)
                dispatchDeleteGalerieIdFrames(dispatch, galerie, frameId);
        }
    }
};
const successGetFrames = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const allIds: string[] = [];
    const byId: { [key: string]: Store.Models.Frame } = {};

    const { frame, frames } = action.payload.data.data;
    if (frames && Array.isArray(frames))
        frames.forEach((f: Store.Models.Frame) => {
            allIds.push(f.id);
            byId[f.id] = f;
        });
    else if (frame && typeof frame === 'object') {
        allIds.push(frame.id);
        byId[frame.id] = frame;
    }
    dispatch(setFramesById(byId));
    if (allIds.length) {
        const galerieId = action.meta.query
            ? action.meta.query.galerieId
            : undefined;
        const previousFrameId = allIds[allIds.length - 1];
        const previous = byId[previousFrameId].autoIncrementId;
        if (galerieId) {
            const galerie = getGalerie(getState, galerieId);
            if (galerie)
                dispatchGalerieIdFrames(dispatch, galerie, {
                    allIds,
                    end: allIds.length < 20,
                    status: 'SUCCESS',
                    previous,
                });
        } else {
            dispatch(setFramesAllIds(allIds));
            dispatch(updateFramesEnd(allIds.length < 20));
            dispatch(updateFramesPrevious(previous));
            dispatch(updateFramesStatus('SUCCESS'));
        }
    }
};
const successPostFrames = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const frame = action.payload.data.data;
    if (frame && typeof frame === 'object') {
        const galerieId = action.meta.query
            ? action.meta.query.galerieid
            : undefined;
        const byId = { [frame.id]: frame };
        const allIds = [frame.id];
        dispatch(setFramesById(byId));
        if (galerieId) {
            const galerie = getGalerie(getState, galerieId);
            if (galerie) {
                dispatchGalerieIdFrames(dispatch, galerie, {
                    allIds,
                });
            }
        } else dispatch(setFramesAllIds(allIds));
    }
};
const successPutFrame = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const { description, frameId } = action.payload.data.data;
    if (
        description &&
        typeof description === 'string' &&
        frameId &&
        typeof frameId === 'string'
    ) {
        const frame = getFrame(getState, frameId);
        dispatch(
            updateFramesById({
                ...frame,
                description,
            })
        );
    }
};
const successFramesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${FRAMES} ${API_SUCCESS}`) {
            switch (action.meta.method) {
                case 'DELETE':
                    successDeleteFrame(dispatch, getState, action);
                    break;
                case 'GET':
                    successGetFrames(dispatch, getState, action);
                    break;
                case 'POST':
                    successPostFrames(dispatch, getState, action);
                    break;
                case 'PUT':
                    successPutFrame(dispatch, getState, action);
                    break;
                default:
                    successDefaultMethod(dispatch, getState, action);
            }
            dispatch(setLoading(false));
        }
    };

export const framesMiddlewares = [
    deleteFramesMiddleware,
    errorFramesMiddleware,
    getFramesMiddleware,
    postFramesMiddleware,
    putFrameMiddleware,
    resetFramesMiddleware,
    successFramesMiddleware,
];

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Reducers
// ----------------------------------
// ----------------------------------
// ----------------------------------
const framesAllIdsInitialState: string[] = [];
const framesAllIdsReducer = (
    state = framesAllIdsInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case FRAMES_ALL_IDS_REMOVE:
            return state.filter((userId) => userId !== action.payload);
        case FRAMES_ALL_IDS_RESET:
            return framesAllIdsInitialState;
        case FRAMES_ALL_IDS_SET:
            return [...state, ...action.payload];
        default:
            return state;
    }
};
const framesByIdInitialState: { [key: string]: Store.Models.Frame } = {};
const framesByIdReducer = (
    state = framesByIdInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case FRAMES_BY_ID_REMOVE: {
            const newState = { ...state };
            delete newState[action.payload];
            return { ...newState };
        }
        case FRAMES_BY_ID_RESET:
            return framesByIdInitialState;
        case FRAMES_BY_ID_SET:
            return {
                ...state,
                ...action.payload,
            };
        case FRAMES_BY_ID_UPDATE:
            return {
                ...state,
                [action.payload.id]: { ...action.payload },
            };
        default:
            return state;
    }
};
const framesCurrentInitialState: string | null = null;
const framesCurrentReducer = (
    state = framesCurrentInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case FRAMES_CURRENT_RESET:
            return framesCurrentInitialState;
        case FRAMES_CURRENT_UPDATE:
            return action.payload;
        default:
            return state;
    }
};
const framesEndInitialState: boolean = false;
const framesEndReducer = (
    state = framesEndInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case FRAMES_END_RESET:
            return framesEndInitialState;
        case FRAMES_END_UPDATE:
            return action.payload;
        default:
            return state;
    }
};
const framesFieldsErrorInitialState: { description?: string } = {};
const framesFieldsErrorReducer = (
    state = framesFieldsErrorInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case FRAMES_FIELDS_ERROR_RESET:
            return framesFieldsErrorInitialState;
        case FRAMES_FIELDS_ERROR_UPDATE:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
const framesPreviousInitialState: string | null = null;
const framesPreviousReducer = (
    state = framesPreviousInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case FRAMES_PREVIOUS_RESET:
            return framesAllIdsInitialState;
        case FRAMES_PREVIOUS_UPDATE:
            return action.payload;
        default:
            return state;
    }
};
const framesStatusInitialState: Store.Status = 'PENDING';
const framesStatusReducer = (
    state = framesStatusInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case FRAMES_STATUS_RESET:
            return framesStatusInitialState;
        case FRAMES_STATUS_UPDATE:
            return action.payload;
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
export const framesReducer = combineReducers({
    allIds: framesAllIdsReducer,
    byId: framesByIdReducer,
    current: framesCurrentReducer,
    end: framesEndReducer,
    fieldsError: framesFieldsErrorReducer,
    previous: framesPreviousReducer,
    status: framesStatusReducer,
});

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Selectors
// ----------------------------------
// ----------------------------------
// ----------------------------------
const selectFrameCurrent = (state: Store.Reducer) => state.frames.current;
const selectFramesAllIds = (state: Store.Reducer) => state.frames.allIds;
const selectFramesById = (state: Store.Reducer) => state.frames.byId;
const selectGaleriesById = (state: Store.Reducer) => state.galeries.byId;
const selectGaleriesCurrent = (state: Store.Reducer) => state.galeries.current;

export const selectCurrentFrame = createSelector(
    [selectFrameCurrent, selectFramesById],
    (current, byId) => {
        if (!current) return undefined;
        return byId[current];
    }
);
export const selectFrameFieldsError = (state: Store.Reducer) =>
    state.frames.fieldsError;
export const selectFrameId = (id: string) =>
    createSelector([selectFramesById], (byId) => byId[id]);
export const selectFrames = createSelector(
    [selectFramesAllIds, selectFramesById],
    (allIds, byId) => allIds.map((id) => byId[id]).filter((frame) => !!frame)
);
export const selectFramesStatus = (state: Store.Reducer) => state.frames.status;
export const selectCurrentGalerieFrame = createSelector(
    [selectFramesById, selectGaleriesCurrent, selectGaleriesById],
    (frameById, currentGalerie, galeriesById) => {
        if (!currentGalerie) return undefined;
        const galerie = galeriesById[currentGalerie];
        if (!galerie || !galerie.frames) return undefined;
        const galerieFrames = galerie.frames.allIds;
        return galerieFrames
            .map((id) => frameById[id])
            .filter((frame) => !!frame);
    }
);
export const selectCurrentGalerieFrameStatus = createSelector(
    [selectGaleriesCurrent, selectGaleriesById],
    (galeriesCurrent, galeriesById) => {
        if (!galeriesCurrent) return undefined;
        const galerie = galeriesById[galeriesCurrent];
        if (!galerie || !galerie.frames) return undefined;
        return galerie.frames.status;
    }
);
