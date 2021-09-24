import { Dispatch, Middleware, combineReducers } from 'redux';
import { createSelector } from 'reselect';

import { END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import { API_ERROR, API_SUCCESS, apiRequest } from '#store/api';
import {
    ALL_IDS,
    BY_ID,
    CURRENT,
    DELETE,
    END,
    FIELDS_ERROR,
    GALERIES,
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
import { dispatchErrorNotification } from '#store/notification';
import { setLoading } from '#store/loading';

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Action types
// ----------------------------------
// ----------------------------------
// ----------------------------------
const GALERIES_DELETE = `${GALERIES} ${DELETE}`;
const GALERIES_GET = `${GALERIES} ${GET}`;
const GALERIES_POST = `${GALERIES} ${POST}`;
const GALERIES_PUT = `${GALERIES} ${PUT}`;
const GALERIES_RESET = `${GALERIES} ${RESET}`;

const GALERIES_ALL_IDS_RESET = `${GALERIES}${ALL_IDS} ${RESET}`;
const GALERIES_ALL_IDS_SET = `${GALERIES}${ALL_IDS} ${SET}`;

const GALERIES_BY_ID_REMOVE = `${GALERIES}${BY_ID} ${REMOVE}`;
const GALERIES_BY_ID_RESET = `${GALERIES}${BY_ID} ${RESET}`;
const GALERIES_BY_ID_SET = `${GALERIES}${BY_ID} ${SET}`;
const GALERIES_BY_UD_UPDATE = `${GALERIES}${BY_ID} ${UPDATE}`;

const GALERIES_CURRENT_RESET = `${GALERIES}${CURRENT} ${RESET}`;
const GALERIES_CURRENT_UPDATE = `${GALERIES}${CURRENT} ${UPDATE}`;

const GALERIES_END_RESET = `${GALERIES}${END} ${RESET}`;
const GALERIES_END_UPDATE = `${GALERIES}${END} ${UPDATE}`;

const GALERIES_FIELDS_ERROR_RESET = `${GALERIES}${FIELDS_ERROR} ${RESET}`;
const GALERIES_FIELDS_ERROR_SET = `${GALERIES}${FIELDS_ERROR} ${SET}`;

const GALERIES_PREVIOUS_RESET = `${GALERIES}${PREVIOUS} ${RESET}`;
const GALERIES_PREVIOUS_UPDATE = `${GALERIES}${PREVIOUS} ${UPDATE}`;

const GALERIES_STATUS_RESET = `${GALERIES}${STATUS} ${RESET}`;
const GALERIES_STATUS_UPDATE = `${GALERIES}${STATUS} ${UPDATE}`;

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Action creators
// ----------------------------------
// ----------------------------------
// ----------------------------------
export const deleteGalerie: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIES_DELETE,
});
export const getGalerieId: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIES_GET,
});
export const getGaleries: (name?: string) => Store.Action = (name) => ({
    meta: { query: { name: name || '' } },
    payload: {},
    type: GALERIES_GET,
});
export const postGalerie: (payload: {
    name: string;
    description: string;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIES_POST,
});
export const putGalerie: (payload: {
    name: string;
    description: string;
    id: string;
}) => Store.Action = (payload) => ({
    payload,
    meta: {},
    type: GALERIES_PUT,
});
export const resetGaleries: () => Store.Action = () => ({
    payload: {},
    meta: {},
    type: GALERIES_RESET,
});
export const resetGaleriesFieldsError: () => Store.Action = () => ({
    payload: {},
    meta: {},
    type: GALERIES_FIELDS_ERROR_RESET,
});

const resetGaleriesAllIds: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIES_ALL_IDS_RESET,
});
const setGaleriesAllIds: (payload: {
    allIds: string[];
    name: string;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIES_ALL_IDS_SET,
});

const removeGaleriesById: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIES_BY_ID_REMOVE,
});
const resetGaleriesById: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIES_BY_ID_RESET,
});
const setGaleriesById: (payload: {
    [key: string]: Store.Models.Galerie;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIES_BY_ID_SET,
});
export const updateGaleriesById: (
    payload: Store.Models.Galerie
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIES_BY_UD_UPDATE,
});

const resetGaleriesCurrent: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIES_CURRENT_RESET,
});
const updateGaleriesCurrent: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIES_CURRENT_UPDATE,
});

const resetGaleriesEnd: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIES_END_RESET,
});
const updateGaleriesEnd: (payload: {
    end: boolean;
    name: string;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIES_END_UPDATE,
});

const setGaleriesFieldsError: (payload: {
    description?: string;
    name?: string;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIES_FIELDS_ERROR_SET,
});

const resetGaleriesPrevious: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIES_PREVIOUS_RESET,
});
const updateGaleriesPrevious: (payload: {
    name: string;
    previous: string;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIES_PREVIOUS_UPDATE,
});

const resetGaleriesStatus: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: GALERIES_STATUS_RESET,
});
const updateGaleriesStatus: (payload: {
    name: string;
    status: Store.Status;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: GALERIES_STATUS_UPDATE,
});

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Dispatchers
// ----------------------------------
// ----------------------------------
// ----------------------------------
const dispatchDeleteGalerie: (
    dispatch: Dispatch<Store.Action>,
    galerieId: string
) => void = (dispatch, galerieId) => {
    dispatch(
        apiRequest({
            meta: {
                entity: GALERIES,
                method: 'DELETE',
                url: END_POINT.GALERIE(galerieId),
            },
            payload: {},
        })
    );
};
const dispatchGetGalerieId: (
    dispatch: Dispatch<Store.Action>,
    galerieId: string
) => void = (dispatch, galerieId) => {
    dispatch(
        apiRequest({
            meta: {
                entity: GALERIES,
                method: 'GET',
                url: END_POINT.GALERIE(galerieId),
            },
            payload: {},
        })
    );
};
const dispatchGetGaleries: (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action,
    query: string
) => void = (dispatch, action, query) => {
    dispatch(
        apiRequest({
            meta: {
                ...action.meta,
                entity: GALERIES,
                method: 'GET',
                url: `${END_POINT.GALERIES}${query}`,
            },
            payload: {},
        })
    );
};
const dispatchPostGalerie: (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => void = (dispatch, action) => {
    dispatch(
        apiRequest({
            meta: {
                ...action.meta,
                entity: GALERIES,
                method: 'POST',
                url: END_POINT.GALERIES,
            },
            payload: action.payload,
        })
    );
};
const dispatchPutGalerie: (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => void = (dispatch, action) => {
    dispatch(
        apiRequest({
            payload: {
                description: action.payload.description,
                name: action.payload.name,
            },
            meta: {
                ...action.meta,
                entity: GALERIES,
                method: 'PUT',
                url: END_POINT.GALERIE(action.payload.id),
            },
        })
    );
};
const dispatchUpdateGalerieStatus: (
    dispatch: Dispatch<Store.Action>,
    name: string,
    status: Store.Status
) => void = (dispatch, name, status) => {
    dispatch(
        updateGaleriesStatus({
            name,
            status,
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
const getEnd = (getState: () => Store.Reducer, name: string) =>
    getState().galeries.end[name];
const getGalerie = (getState: () => Store.Reducer, id: string) =>
    getState().galeries.byId[id];
const getPrevious = (getState: () => Store.Reducer, name: string) =>
    getState().galeries.previous[name];
const getStatus = (getState: () => Store.Reducer, name: string) =>
    getState().galeries.status[name];

const deleteGaleriesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (
            typeof action.payload === 'string' &&
            action.type === GALERIES_DELETE
        ) {
            dispatch(setLoading(true));
            dispatchDeleteGalerie(dispatch, action.payload);
        }
    };
const errorGaleriesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${GALERIES} ${API_ERROR}`) {
            if (
                typeof action.payload === 'object' &&
                (typeof action.payload.description === 'string' ||
                    typeof action.payload.name === 'string')
            ) {
                dispatch(setGaleriesFieldsError(action.payload));
            } else {
                const galeriesName = action.meta.query
                    ? action.meta.query.name
                    : undefined;
                if (galeriesName)
                    dispatch(
                        updateGaleriesStatus({
                            name: galeriesName,
                            status: 'ERROR',
                        })
                    );
                dispatchErrorNotification(dispatch, action);
            }
            dispatch(setLoading(false));
        }
    };
const getGaleriesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === GALERIES_GET) {
            const name = action.meta.query ? action.meta.query.name : undefined;
            if (typeof action.payload === 'string')
                dispatchGetGalerieId(dispatch, action.payload);
            else if (typeof name === 'string') {
                const end = getEnd(getState, name);
                const previous = getPrevious(getState, name) || '';
                const status = getStatus(getState, name) || 'PENDING';
                if (
                    !end &&
                    status !== 'LOADING' &&
                    status !== 'INITIAL_LOADING'
                ) {
                    const query = `?name=${name}&previous=${previous}`;
                    const newStatus =
                        status === 'PENDING' ? 'INITIAL_LOADING' : 'LOADING';
                    dispatchUpdateGalerieStatus(dispatch, name, newStatus);
                    dispatchGetGaleries(dispatch, action, query);
                }
            }
        }
    };
const postGalerieMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (
            typeof action.payload.description === 'string' &&
            typeof action.payload.name === 'string' &&
            action.type === GALERIES_POST
        ) {
            dispatch(setLoading(true));
            dispatchPostGalerie(dispatch, action);
        }
    };
const putGalerieMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (
            action.type === GALERIES_PUT &&
            typeof action.payload.description === 'string' &&
            typeof action.payload.id === 'string' &&
            typeof action.payload.name === 'string'
        ) {
            dispatch(setLoading(true));
            dispatchPutGalerie(dispatch, action);
        }
    };
const resetGaleriesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === GALERIES_RESET) {
            dispatch(resetGaleriesAllIds());
            dispatch(resetGaleriesById());
            dispatch(resetGaleriesCurrent());
            dispatch(resetGaleriesEnd());
            dispatch(resetGaleriesFieldsError());
            dispatch(resetGaleriesPrevious());
            dispatch(resetGaleriesStatus());
        }
    };
const successDefaultMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    const name = action.meta.query ? action.meta.query.name : undefined;
    if (typeof name === 'string')
        dispatch(updateGaleriesStatus({ name, status: 'ERROR' }));
    dispatchErrorNotification(dispatch, ERROR_MESSAGE.METHOD_NOT_FOUND);
};
const successDeleteGalerie = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    const { galerieId } = action.payload.data.data;
    if (typeof galerieId === 'string') {
        dispatch(removeGaleriesById(galerieId));
        dispatch(resetGaleriesAllIds());
        dispatch(resetGaleriesCurrent());
        dispatch(resetGaleriesEnd());
        dispatch(resetGaleriesPrevious());
        dispatch(resetGaleriesStatus());
    }
};
const successGetGaleries = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    const allIds: string[] = [];
    const byId: { [key: string]: Store.Models.Galerie } = {};
    const { galerie, galeries } = action.payload.data.data;
    const name = action.meta.query ? action.meta.query.name : undefined;
    if (galeries && Array.isArray(galeries))
        galeries.forEach((g: Store.Models.Galerie) => {
            allIds.push(g.id);
            byId[g.id] = g;
        });
    else if (galerie && typeof galerie === 'object') {
        allIds.push(galerie.id);
        byId[galerie.id] = galerie;
    }
    dispatch(setGaleriesById(byId));
    if (typeof name === 'string' && allIds.length) {
        const previousGalerieId = allIds[allIds.length - 1];
        const previous = byId[previousGalerieId].hiddenName || '';
        dispatch(setGaleriesAllIds({ allIds, name }));
        dispatch(updateGaleriesEnd({ end: allIds.length < 20, name }));
        dispatch(updateGaleriesPrevious({ name, previous }));
        dispatch(updateGaleriesStatus({ name, status: 'SUCCESS' }));
    }
};
const successPostGaleries = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    const { galerie } = action.payload.data.data;
    if (galerie && typeof galerie === 'object') {
        const byId = { [galerie.id]: galerie };
        dispatch(resetGaleriesAllIds());
        dispatch(resetGaleriesCurrent());
        dispatch(resetGaleriesEnd());
        dispatch(resetGaleriesFieldsError());
        dispatch(resetGaleriesPrevious());
        dispatch(setGaleriesById(byId));
        dispatch(updateGaleriesCurrent(galerie.id));
    }
};
const successPutGalerie = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const { galerie } = action.payload.data.data;
    if (
        galerie &&
        typeof galerie === 'object' &&
        typeof galerie.id === 'string'
    ) {
        const currentGalerie = getGalerie(getState, galerie.id);
        if (currentGalerie) {
            dispatch(
                updateGaleriesById({
                    ...currentGalerie,
                    ...galerie,
                })
            );
        }
    }
};
const successGaleriesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${GALERIES} ${API_SUCCESS}`) {
            switch (action.meta.method) {
                case 'DELETE':
                    successDeleteGalerie(dispatch, action);
                    break;
                case 'GET':
                    successGetGaleries(dispatch, action);
                    break;
                case 'POST':
                    successPostGaleries(dispatch, action);
                    break;
                case 'PUT':
                    successPutGalerie(dispatch, getState, action);
                    break;
                default:
                    successDefaultMethod(dispatch, action);
            }
            dispatch(setLoading(false));
        }
    };

export const galeriesMiddleware = [
    deleteGaleriesMiddleware,
    errorGaleriesMiddleware,
    getGaleriesMiddleware,
    postGalerieMiddleware,
    putGalerieMiddleware,
    resetGaleriesMiddleware,
    successGaleriesMiddleware,
];

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Reducers
// ----------------------------------
// ----------------------------------
// ----------------------------------
const galeriesAllIdsInitialState: { [key: string]: string[] } = {};
const galeriesAllIdsReducer = (
    state = galeriesAllIdsInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIES_ALL_IDS_RESET:
            return galeriesAllIdsInitialState;
        case GALERIES_ALL_IDS_SET:
            return {
                ...state,
                [action.payload.name]: {
                    ...state[action.payload.name],
                    ...action.payload.allIds,
                },
            };
        default:
            return state;
    }
};
const galeriesByIdInitialState: {
    [key: string]: Store.Models.Galerie;
} = {};
const galeriesByIdReducer = (
    state = galeriesByIdInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIES_BY_ID_REMOVE: {
            const newState = { ...state };
            delete newState[action.payload];
            return { ...newState };
        }
        case GALERIES_BY_ID_RESET:
            return galeriesByIdInitialState;
        case GALERIES_BY_ID_SET:
            return {
                ...state,
                ...action.payload,
            };
        case GALERIES_BY_UD_UPDATE:
            return {
                ...state,
                [action.payload.id]: { ...action.payload },
            };
        default:
            return state;
    }
};
const galeriesCurrentInitialState: string | null = null;
const galeriesCurrentReducer = (
    state = galeriesCurrentInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIES_CURRENT_RESET:
            return galeriesCurrentInitialState;
        case GALERIES_CURRENT_UPDATE:
            return action.payload;
        default:
            return state;
    }
};
const galeriesEndInitialState: { [key: string]: boolean } = {};
const galeriesEndReducer = (
    state = galeriesEndInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIES_END_RESET:
            return galeriesEndInitialState;
        case GALERIES_END_UPDATE:
            return {
                ...state,
                [action.payload.name]: action.payload.end,
            };
        default:
            return state;
    }
};
const galeriesFieldsErrorInitialState: { descrition?: string; name?: string } =
    {};
const galeriesFieldsErrorReducer = (
    state = galeriesFieldsErrorInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIES_FIELDS_ERROR_RESET:
            return galeriesFieldsErrorInitialState;
        case GALERIES_FIELDS_ERROR_SET:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
const galeriesPreviousInitialState: { [key: string]: string } = {};
const galeriesPreviousReducer = (
    state = galeriesPreviousInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIES_PREVIOUS_RESET:
            return galeriesPreviousInitialState;
        case GALERIES_PREVIOUS_UPDATE:
            return {
                ...state,
                [action.payload.name]: action.payload.previousGalerie,
            };
        default:
            return state;
    }
};
const galeriesStatusReducerInitialState: { [key: string]: Store.Status } = {};
const galeriesStatusReducer = (
    state = galeriesStatusReducerInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIES_STATUS_RESET:
            return galeriesStatusReducerInitialState;
        case GALERIES_STATUS_UPDATE:
            return {
                ...state,
                [action.payload.name]: action.payload.status,
            };
        default:
            return state;
    }
};

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Combined reducers.
// ----------------------------------
// ----------------------------------
// ----------------------------------
export const galeriesReducer = combineReducers({
    allIds: galeriesAllIdsReducer,
    byId: galeriesByIdReducer,
    current: galeriesCurrentReducer,
    end: galeriesEndReducer,
    fieldsError: galeriesFieldsErrorReducer,
    previous: galeriesPreviousReducer,
    status: galeriesStatusReducer,
});

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Selectors.
// ----------------------------------
// ----------------------------------
// ----------------------------------
const selectGaleriesAllIds = (state: Store.Reducer) => state.galeries.allIds;
const selectGaleriesById = (state: Store.Reducer) => state.galeries.byId;
const selectGaleriesCurrent = (state: Store.Reducer) => state.galeries.current;
const selectUiFilterGaleriesName = (state: Store.Reducer) =>
    state.ui.filterGaleriesName;
const selectGaleriesNameAllId = createSelector(
    [selectGaleriesAllIds, selectUiFilterGaleriesName],
    (galeriesAllIds, uiFilterGaleriesName) =>
        galeriesAllIds[uiFilterGaleriesName]
);
const selectGaleriesStatus = (state: Store.Reducer) => state.galeries.status;

export const selectCurrentGalerie = createSelector(
    [selectGaleriesById, selectGaleriesCurrent],
    (byId, current) => (current ? byId[current] : undefined)
);
export const selectGaleriesFieldsError = (state: Store.Reducer) =>
    state.galeries.fieldsError;
export const selectGalerie = (id: string) =>
    createSelector([selectGaleriesById], (byId) => byId[id]);
export const selectGaleries = createSelector(
    [selectGaleriesNameAllId, selectGaleriesById],
    (allIds, byId) =>
        allIds.map((id) => byId[id]).filter((galerie) => !!galerie)
);
export const selectGaleriesNameStatus = createSelector(
    [selectGaleriesStatus, selectUiFilterGaleriesName],
    (galeriesStatus, uiFilterGaleriesName) =>
        galeriesStatus[uiFilterGaleriesName]
);
