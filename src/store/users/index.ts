import { combineReducers, Dispatch, Middleware } from 'redux';
import { createSelector } from 'reselect';

import { END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import { API_ERROR, API_SUCCESS, apiRequest } from '#store/api';
import {
    BY_ID,
    CURRENT,
    ME,
    GET,
    RESET,
    SET,
    STATUS,
    UPDATE,
    USERS,
    PREVIOUS,
    END,
    ALL_IDS,
} from '#store/genericActionTypes';
import { updateGaleriesById } from '#store/galeries';
import { dispatchErrorNotification } from '#store/notification';

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Action types
// ----------------------------------
// ----------------------------------
// ----------------------------------
const USERS_GET = `${USERS} ${GET}`;
const USERS_RESET = `${USERS} ${RESET}`;

const USERS_BY_ID_SET = `${USERS}${BY_ID} ${SET}`;
const USERS_BY_ID_RESET = `${USERS}${BY_ID} ${RESET}`;
const USERS_BY_ID_UPDATE = `${USERS}${BY_ID} ${UPDATE}`;

const USERS_ALL_IDS_RESET = `${USERS}${ALL_IDS} ${RESET}`;
const USERS_ALL_IDS_SET = `${USERS}${ALL_IDS} ${SET}`;

const USERS_CURRENT_RESET = `${USERS}${CURRENT} ${RESET}`;
const USERS_CURRENT_UPDATE = `${USERS}${CURRENT} ${UPDATE}`;

const USERS_END_RESET = `${USERS}${END} ${RESET}`;
const USERS_END_UPDATE = `${USERS}${END} ${UPDATE}`;

const USERS_PREVIOUS_RESET = `${USERS}${PREVIOUS} ${RESET}`;
const USERS_PREVIOUS_UPDATE = `${USERS}${PREVIOUS} ${UPDATE}`;

const USERS_STATUS_RESET = `${USERS}${STATUS} ${RESET}`;
const USERS_STATUS_UPDATE = `${USERS}${STATUS} ${UPDATE}`;

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Actions
// ----------------------------------
// ----------------------------------
// ----------------------------------
export const getGalerieUsers: (galerieId: string) => Store.Action = (
    galerieId
) => ({
    meta: { query: { galerieId } },
    payload: {},
    type: USERS_GET,
});
export const getUserId: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: USERS_GET,
});
export const getUsers: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: USERS_GET,
});
export const resetUsers: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: USERS_RESET,
});

const resetUsersAllIds: () => Store.Action = () => ({
    payload: {},
    meta: {},
    type: USERS_ALL_IDS_RESET,
});
const setUsersAllIds: (payload: string[]) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: USERS_ALL_IDS_SET,
});

const resetUsersById: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: USERS_BY_ID_RESET,
});
export const setUsersById: (byId: {
    [key: string]: Store.Models.User;
}) => Store.Action = (byId) => ({
    meta: {},
    payload: { byId },
    type: USERS_BY_ID_SET,
});
export const updateUsersById: (payload: Store.Models.User) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: USERS_BY_ID_UPDATE,
});

const resetUserCurrent: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: USERS_CURRENT_RESET,
});
export const updateUserCurrent: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: USERS_CURRENT_UPDATE,
});

const resetUsersEnd: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: USERS_END_RESET,
});
const updateUsersEnd: (payload: boolean) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: USERS_END_UPDATE,
});

const resetUsersPrevious: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: USERS_PREVIOUS_RESET,
});
const updateUsersPrevious: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: USERS_PREVIOUS_UPDATE,
});

const resetUsersStatus: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: USERS_STATUS_RESET,
});
const updateUsersStatus: (payload: Store.Status) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: USERS_STATUS_UPDATE,
});

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Dispatchers
// ----------------------------------
// ----------------------------------
// ----------------------------------
const dispatchGalerieIdUsersStatus: (
    dispatch: Dispatch<Store.Action>,
    galerie: Store.Models.Galerie,
    status: Store.Status
) => void = (dispatch, galerie, status) => {
    dispatch(
        updateGaleriesById({
            ...galerie,
            users: {
                ...(galerie.users || {
                    allIds: [],
                    end: false,
                }),
                status,
            },
        })
    );
};
const dispatchGetGalerieUsers: (
    dispatch: Dispatch<Store.Action>,
    galerieId: string,
    previous: string
) => void = (dispatch, galerieId, previous) => {
    const query = `?previous=${previous}`;
    dispatch(
        apiRequest({
            meta: {
                query: { galerieId },
                entity: USERS,
                method: 'GET',
                url: `${END_POINT.GET_GALERIE_USERS(galerieId)}${query}`,
            },
            payload: {},
        })
    );
};
const dispatchGetUser: (
    dispatch: Dispatch<Store.Action>,
    userId: string
) => void = (dispatch, userId) => {
    dispatch(
        apiRequest({
            payload: {},
            meta: {
                entity: USERS,
                method: 'GET',
                url: END_POINT.GET_USER_ID(userId),
            },
        })
    );
};
const dispatchGetUsers: (
    dispatch: Dispatch<Store.Action>,
    previous: string
) => void = (dispatch, previous) => {
    const query = `?previous=${previous}`;
    dispatch(
        apiRequest({
            payload: {},
            meta: {
                entity: USERS,
                method: 'GET',
                url: `${END_POINT.USERS}${query}`,
            },
        })
    );
};

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Middlewares
// ----------------------------------
// ----------------------------------
// ----------------------------------
const getGalerie = (getState: () => Store.Reducer, galerieId: string) =>
    getState().galeries.byId[galerieId];
const getUsersEnd = (getState: () => Store.Reducer) => getState().users.end;
const getUsersPrevious = (getState: () => Store.Reducer) =>
    getState().users.previous;
const getUsersStatus = (getState: () => Store.Reducer) =>
    getState().users.status;

const errorUsersMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${USERS} ${API_ERROR}`) {
            const galerieId = action.meta.query
                ? action.meta.query.galerieId
                : undefined;
            if (typeof galerieId === 'string') {
                const galerie = getGalerie(getState, galerieId);
                dispatchGalerieIdUsersStatus(dispatch, galerie, 'ERROR');
            } else dispatch(updateUsersStatus('ERROR'));
            dispatchErrorNotification(dispatch, action);
        }
    };
const getUsersMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === USERS_GET) {
            const galerieId = action.meta.query
                ? action.meta.query.galerieId
                : undefined;
            const userId = action.payload;
            if (typeof galerieId === 'string') {
                const galerie = getGalerie(getState, galerieId);
                const end = galerie.users ? galerie.users.end : false;
                const status = galerie.users ? galerie.users.status : 'PENDING';
                if (!end && !status.includes('LOADING')) {
                    const newStatus: Store.Status =
                        status === 'PENDING' ? 'INITIAL_LOADING' : 'LOADING';
                    const previous = galerie.users
                        ? galerie.users.previousFrame || ''
                        : '';
                    dispatchGalerieIdUsersStatus(dispatch, galerie, newStatus);
                    dispatchGetGalerieUsers(dispatch, galerieId, previous);
                }
            } else if (typeof userId === 'string')
                dispatchGetUser(dispatch, userId);
            else {
                const end = getUsersEnd(getState);
                const status = getUsersStatus(getState);
                if (!end && !status.includes('LOADING')) {
                    const newStatus: Store.Status =
                        status === 'PENDING' ? 'INITIAL_LOADING' : 'LOADING';
                    const previous = getUsersPrevious(getState) || '';
                    dispatch(updateUsersStatus(newStatus));
                    dispatchGetUsers(dispatch, previous);
                }
            }
        }
    };
const resetUsersMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === USERS_RESET) {
            dispatch(resetUsersAllIds());
            dispatch(resetUsersById());
            dispatch(resetUserCurrent());
            dispatch(resetUsersEnd());
            dispatch(resetUsersPrevious());
            dispatch(resetUsersStatus());
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
        if (galerie) dispatchGalerieIdUsersStatus(dispatch, galerie, 'ERROR');
    } else dispatch(updateUsersStatus('ERROR'));
    dispatchErrorNotification(dispatch, ERROR_MESSAGE.METHOD_NOT_FOUND);
};
const successGetUsers = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    const allIds: string[] = [];
    const byId: { [key: string]: Store.Models.User } = {};
    const { user, users } = action.payload.data.data;
    if (users && Array.isArray(users)) {
        users.forEach((u: Store.Models.User) => {
            allIds.push(u.id);
            byId[u.id] = u;
        });
    } else if (user && typeof user === 'object') {
        allIds.push(user.id);
        byId[user.id] = user;
    }
    dispatch(setUsersById(byId));
    if (users && Array.isArray(users)) {
        const previousUserId = allIds[allIds.length - 1];
        const previous = byId[previousUserId].userName || '';
        dispatch(setUsersAllIds(allIds));
        dispatch(updateUsersEnd(allIds.length < 20));
        dispatch(updateUsersStatus('SUCCESS'));
        dispatch(updateUsersPrevious(previous));
    }
};
const successUsersMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${ME} ${API_SUCCESS}`) {
            switch (action.meta.method) {
                case 'GET':
                    successGetUsers(dispatch, action);
                    break;
                default:
                    successDefaultMethod(dispatch, getState, action);
            }
        }
    };

export const usersMiddleware = [
    errorUsersMiddleware,
    getUsersMiddleware,
    resetUsersMiddleware,
    successUsersMiddleware,
];

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Reducers
// ----------------------------------
// ----------------------------------
// ----------------------------------
const usersAllIdsInitialState: string[] = [];
const usersAllIdsReducer = (
    state = usersAllIdsInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case USERS_ALL_IDS_RESET:
            return usersAllIdsInitialState;
        case USERS_ALL_IDS_SET:
            return [...state, ...action.payload];
        default:
            return state;
    }
};
const usersByIdInitialState: { [key: string]: Store.Models.User } = {};
const usersByIdReducer = (
    state = usersByIdInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case USERS_BY_ID_RESET:
            return usersByIdInitialState;
        case USERS_BY_ID_SET:
            return {
                ...state,
                ...action.payload,
            };
        case USERS_BY_ID_UPDATE:
            return {
                ...state,
                [action.payload.id]: { ...action.payload },
            };
        default:
            return state;
    }
};
const usersCurrentInitialState: string | null = null;
const usersCurrentReducer = (
    state = usersCurrentInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case USERS_CURRENT_RESET:
            return usersCurrentInitialState;
        case USERS_CURRENT_UPDATE:
            return action.payload;
        default:
            return state;
    }
};
const usersEndInitialState: boolean = false;
const usersEndReducer = (
    state = usersEndInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case USERS_END_RESET:
            return usersEndInitialState;
        case USERS_END_UPDATE:
            return action.payload;
        default:
            return state;
    }
};
const usersPreviousInitialState: string | null = null;
const usersPreviousReducer = (
    state = usersPreviousInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case USERS_PREVIOUS_RESET:
            return usersPreviousInitialState;
        case USERS_PREVIOUS_UPDATE:
            return action.payload;
        default:
            return state;
    }
};
const userStatusInitialState: Store.Status = 'PENDING';
const usersStatusReducer = (
    state = userStatusInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case USERS_STATUS_RESET:
            return userStatusInitialState;
        case USERS_STATUS_UPDATE:
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
export const usersReducer = combineReducers({
    allIds: usersAllIdsReducer,
    byId: usersByIdReducer,
    current: usersCurrentReducer,
    end: usersEndReducer,
    previous: usersPreviousReducer,
    status: usersStatusReducer,
});

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Selectors.
// ----------------------------------
// ----------------------------------
const selectUsersAllIds = (state: Store.Reducer) => state.users.allIds;
const selectUsersById = (state: Store.Reducer) => state.users.byId;
const selectUsersCurrent = (state: Store.Reducer) => state.users.current;
const selectGaleriesById = (state: Store.Reducer) => state.galeries.byId;
const selectGalerieCurrent = (state: Store.Reducer) => state.galeries.current;

export const selectCurrentUser = createSelector(
    [selectUsersById, selectUsersCurrent],
    (byId, current) => {
        if (!current) return undefined;
        return byId[current];
    }
);
export const selectGalerieUser = createSelector(
    [selectUsersById, selectGalerieCurrent, selectGaleriesById],
    (usersById, currentGalerie, galeriesById) => {
        if (!currentGalerie) return undefined;
        const galerie = galeriesById[currentGalerie];
        if (!galerie || !galerie.users) return undefined;
        const galerieUsers = galerie.users.allIds;
        return galerieUsers.map((id) => usersById[id]).filter((user) => !!user);
    }
);
export const selectUserId = (id: string) =>
    createSelector([selectUsersById], (usersById) => usersById[id] || null);
export const selectUsers = createSelector(
    [selectUsersAllIds, selectUsersById],
    (allIds, byId) => allIds.map((id) => byId[id]).filter((user) => !!user)
);
export const selectUsersStatus = (state: Store.Reducer) => state.users.status;
