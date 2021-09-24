import { combineReducers, Dispatch, Middleware } from 'redux';
import { createSelector } from 'reselect';
import {
    ALL_IDS,
    BY_ID,
    CURRENT,
    DELETE,
    END,
    GET,
    POST,
    PREVIOUS,
    PROFILE_PICTURES,
    REMOVE,
    RESET,
    SET,
    STATUS,
    UPDATE,
} from '#store/genericActionTypes';
import { apiRequest, API_ERROR, API_SUCCESS } from '#store/api';
import { END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import { dispatchErrorNotification } from '#store/notification';
import { updateUsersById } from '#store/users';
import { setLoading } from '#store/loading';

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Action types
// ----------------------------------
// ----------------------------------
// ----------------------------------
const PROFILE_PICTURES_DELETE = `${PROFILE_PICTURES} ${DELETE}`;
const PROFILE_PICTURES_GET = `${PROFILE_PICTURES} ${GET}`;
const PROFILE_PICTURES_POST = `${PROFILE_PICTURES} ${POST}`;
const PROFILE_PICTURES_RESET = `${PROFILE_PICTURES} ${RESET}`;

const PROFILE_PICTURES_ALL_ID_REMOVE = `${PROFILE_PICTURES}${ALL_IDS} ${REMOVE}`;
const PROFILE_PICTURES_ALL_ID_RESET = `${PROFILE_PICTURES}${ALL_IDS} ${RESET}`;
const PROFILE_PICTURES_ALL_ID_SET = `${PROFILE_PICTURES}${ALL_IDS} ${SET}`;

const PROFILE_PICTURES_BY_ID_REMOVE = `${PROFILE_PICTURES}${BY_ID} ${REMOVE}`;
const PROFILE_PICTURES_BY_ID_RESET = `${PROFILE_PICTURES}${BY_ID} ${RESET}`;
const PROFILE_PICTURES_BY_ID_SET = `${PROFILE_PICTURES}${BY_ID} ${SET}`;

const PROFILE_PICTURES_CURRENT_RESET = `${PROFILE_PICTURES}${CURRENT} ${RESET}`;
const PROFILE_PICTURES_CURRENT_UPDATE = `${PROFILE_PICTURES}${CURRENT} ${SET}`;

const PROFILE_PICTURES_END_RESET = `${PROFILE_PICTURES}${END} ${RESET}`;
const PROFILE_PICTURES_END_UPDATE = `${PROFILE_PICTURES}${END} ${UPDATE}`;

const PROFILE_PICTURES_PREVIOUS_RESET = `${PROFILE_PICTURES}${PREVIOUS} ${RESET}`;
const PROFILE_PICTURES_PREVIOUS_UPDATE = `${PROFILE_PICTURES}${PREVIOUS} ${UPDATE}`;

const PROFILE_PICTURES_STATUS_RESET = `${PROFILE_PICTURES}${STATUS} ${RESET}`;
const PROFILE_PICTURES_STATUS_UPDATE = `${PROFILE_PICTURES}${STATUS} ${UPDATE}`;

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Action creators
// ----------------------------------
// ----------------------------------
// ----------------------------------
export const deleteProfilePicture: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: PROFILE_PICTURES_DELETE,
});
export const getMeCurrentProfilePicture: () => Store.Action = () => ({
    meta: { query: { userId: 'me' } },
    payload: {},
    type: PROFILE_PICTURES_GET,
});
export const getProfilePictureId: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: PROFILE_PICTURES_GET,
});
export const getProfilePictures: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: PROFILE_PICTURES_GET,
});
export const getUserCurrentProfilePicture: (userId: string) => Store.Action = (
    userId: string
) => ({
    meta: { query: { userId } },
    payload: {},
    type: PROFILE_PICTURES_GET,
});
export const postProfilePicture: (payload: FormData) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: PROFILE_PICTURES_POST,
});
export const resetProfilePictures: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: PROFILE_PICTURES_RESET,
});
export const updateProfilePicturesCurrent: (
    payload: string | null
) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: PROFILE_PICTURES_CURRENT_UPDATE,
});

const removeProfilePicturesAllId: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: PROFILE_PICTURES_ALL_ID_REMOVE,
});
const resetProfilePicturesAllId: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: PROFILE_PICTURES_ALL_ID_RESET,
});
const setProfilePicturesAllId: (payload: string[]) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: PROFILE_PICTURES_ALL_ID_SET,
});
const removeProfilePicturesById: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: PROFILE_PICTURES_BY_ID_REMOVE,
});
const resetProfilePicturesById: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: PROFILE_PICTURES_BY_ID_RESET,
});
const setProfilePicturesById: (payload: {
    [key: string]: Store.Models.ProfilePicture;
}) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: PROFILE_PICTURES_BY_ID_SET,
});
const resetProfilePicturesCurrent: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: PROFILE_PICTURES_CURRENT_RESET,
});
const resetProfilePicturesEnd: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: PROFILE_PICTURES_END_RESET,
});
const updateProfilePicturesEnd: (payload: boolean) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: PROFILE_PICTURES_END_UPDATE,
});
const resetProfilePicturesPrevious: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: PROFILE_PICTURES_PREVIOUS_RESET,
});
const updateProfilePicturesPrevious: (payload: string) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: PROFILE_PICTURES_PREVIOUS_UPDATE,
});
const resetProfilePicturesStatus: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: PROFILE_PICTURES_STATUS_RESET,
});
const updateProfilePicturesStatus: (payload: Store.Status) => Store.Action = (
    payload
) => ({
    meta: {},
    payload,
    type: PROFILE_PICTURES_STATUS_UPDATE,
});

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Dispatchers
// ----------------------------------
// ----------------------------------
// ----------------------------------
const dispatchDeleteProfilePicture: (
    dispatch: Dispatch<Store.Action>,
    profilePictureId: string
) => void = (dispatch, profilePictureId) => {
    dispatch(
        apiRequest({
            meta: {
                entity: PROFILE_PICTURES,
                method: 'DELETE',
                url: `${END_POINT.PROFILE_PICTURES}/${profilePictureId}`,
            },
            payload: {},
        })
    );
};
const dispatchGetMeCurrentProfilePicture: (
    dispatch: Dispatch<Store.Action>
) => void = (dispatch) => {
    dispatch(
        apiRequest({
            meta: {
                entity: PROFILE_PICTURES,
                method: 'GET',
                url: `${END_POINT.USERS}${END_POINT.ME}${END_POINT.CURRENT_PROFILE_PICTURE}`,
            },
            payload: {},
        })
    );
};
const dispatchGetprofilePicture: (
    dispatch: Dispatch<Store.Action>,
    profilePictureId: string
) => void = (dispatch, profilePictureId) => {
    dispatch(
        apiRequest({
            meta: {
                entity: PROFILE_PICTURES,
                method: 'GET',
                url: `${END_POINT.PROFILE_PICTURES}/${profilePictureId}`,
            },
            payload: {},
        })
    );
};
const dispatchGetProfilePictures: (dispatch: Dispatch<Store.Action>) => void = (
    dispatch
) => {
    dispatch(
        apiRequest({
            meta: {
                entity: PROFILE_PICTURES,
                method: 'GET',
                url: `${END_POINT.PROFILE_PICTURES}`,
            },
            payload: {},
        })
    );
};
const dispatchGetUserCurrentProfilePicture: (
    dispatch: Dispatch<Store.Action>,
    userId: string
) => void = (dispatch, userId) => {
    dispatch(
        apiRequest({
            meta: {
                entity: PROFILE_PICTURES,
                method: 'GET',
                url: `${END_POINT.USERS}/${userId}${END_POINT.CURRENT_PROFILE_PICTURE}`,
            },
            payload: {},
        })
    );
};
const dispatchPostProfilePicture: (
    dispatch: Dispatch<Store.Action>,
    payload: FormData
) => void = (dispatch, payload) => {
    dispatch(
        apiRequest({
            meta: {
                entity: PROFILE_PICTURES,
                method: 'POST',
                url: END_POINT.PROFILE_PICTURES,
            },
            payload,
        })
    );
};
const dispatchUserCurrentProfilePicture: (
    dispatch: Dispatch<Store.Action>,
    user: Store.Models.User,
    data: {
        id?: string | null;
        status?: Store.Status;
    }
) => void = (dispatch, user, status) => {
    const defaultCurrentProfilePicture: typeof user.currentProfilePicture = {
        id: null,
        status: 'PENDING',
    };
    dispatch(
        updateUsersById({
            ...user,
            currentProfilePicture: {
                ...(user.currentProfilePicture || defaultCurrentProfilePicture),
                ...status,
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
const getMe = (getState: () => Store.Reducer) => {
    const meId = getState().me.id;
    if (!meId) return undefined;
    return getState().users.byId[meId];
};
const getUser = (getState: () => Store.Reducer, userId: string) =>
    getState().users.byId[userId];
const getProfilePicturesAllId = (getState: () => Store.Reducer) =>
    getState().profilePictures.allIds;

const deleteProfilePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (
            typeof action.payload === 'string' &&
            action.type === PROFILE_PICTURES_DELETE
        ) {
            dispatch(setLoading(true));
            dispatchDeleteProfilePicture(dispatch, action.payload);
        }
    };
const errorProfilePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${PROFILE_PICTURES} ${API_ERROR}`) {
            const userId = action.payload.query
                ? action.payload.query.userId
                : undefined;
            if (typeof userId === 'string') {
                const user = getUser(getState, userId);
                if (user)
                    dispatchUserCurrentProfilePicture(dispatch, user, {
                        status: 'ERROR',
                    });
            }
            dispatchErrorNotification(dispatch, action);
            dispatch(setLoading(false));
        }
    };
const getProfilePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === PROFILE_PICTURES_GET) {
            const userId = action.meta.query
                ? action.meta.query.userId
                : undefined;
            if (userId === 'me') {
                const me = getMe(getState);
                if (me) {
                    const status = me.currentProfilePicture
                        ? me.currentProfilePicture.status
                        : 'PENDING';
                    if (status === 'PENDING') {
                        dispatchUserCurrentProfilePicture(dispatch, me, {
                            status: 'PENDING',
                        });
                        dispatchGetMeCurrentProfilePicture(dispatch);
                    }
                }
            } else if (userId) {
                const user = getUser(getState, userId);
                if (user) {
                    const status = user.currentProfilePicture
                        ? user.currentProfilePicture.status
                        : 'PENDING';
                    if (status === 'PENDING') {
                        dispatchUserCurrentProfilePicture(dispatch, user, {
                            status: 'PENDING',
                        });
                        dispatchGetUserCurrentProfilePicture(dispatch, userId);
                    }
                }
            } else if (typeof action.payload === 'string')
                dispatchGetprofilePicture(dispatch, action.payload);
            else dispatchGetProfilePictures(dispatch);
        }
    };
const postProfilePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (
            action.payload instanceof FormData &&
            action.type === PROFILE_PICTURES_POST
        ) {
            dispatch(setLoading(true));
            dispatchPostProfilePicture(dispatch, action.payload);
        }
    };
const resetProfilePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === PROFILE_PICTURES_RESET) {
            dispatch(resetProfilePicturesAllId());
            dispatch(resetProfilePicturesById());
            dispatch(resetProfilePicturesCurrent());
            dispatch(resetProfilePicturesEnd());
            dispatch(resetProfilePicturesPrevious());
            dispatch(resetProfilePicturesStatus());
        }
    };
const successDefaultMethod = (dispatch: Dispatch<Store.Action>) => {
    dispatchErrorNotification(dispatch, ERROR_MESSAGE.METHOD_NOT_FOUND);
};
const successDeleteProfilePicture = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const { profilePictureId } = action.payload.data.data;
    dispatch(removeProfilePicturesById(profilePictureId));
    if (typeof profilePictureId === 'string') {
        const allIds = getProfilePicturesAllId(getState);
        if (allIds.includes(profilePictureId))
            dispatch(removeProfilePicturesAllId(profilePictureId));
        const me = getMe(getState);
        if (
            me &&
            me.currentProfilePicture &&
            me.currentProfilePicture.id === profilePictureId
        )
            dispatchUserCurrentProfilePicture(dispatch, me, {
                id: null,
            });
    }
};
const successGetProfilePictures = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const allIds: string[] = [];
    const byId: { [key: string]: Store.Models.ProfilePicture } = {};
    let id: string | undefined;
    const { profilePicture, profilePictures } = action.payload.data.data;
    if (profilePictures && Array.isArray(profilePictures))
        profilePictures.forEach((pp: Store.Models.ProfilePicture) => {
            allIds.push(pp.id);
            byId[pp.id] = pp;
        });
    else if (profilePicture && typeof profilePicture === 'object') {
        id = profilePicture.id;
        byId[profilePicture.id] = profilePicture;
    }
    dispatch(setProfilePicturesById(byId));
    if (allIds.length) {
        const previousProfilePictureId = allIds[allIds.length - 1];
        const previous = byId[previousProfilePictureId].autoIncrementId;
        dispatch(setProfilePicturesAllId(allIds));
        dispatch(updateProfilePicturesEnd(allIds.length < 20));
        dispatch(updateProfilePicturesPrevious(previous));
        dispatch(updateProfilePicturesStatus('SUCCESS'));
    } else if (id) {
        const userId = action.meta.query ? action.meta.query.userId : undefined;
        if (userId) {
            const user = getUser(getState, userId);
            if (user)
                dispatchUserCurrentProfilePicture(dispatch, user, {
                    id,
                    status: 'SUCCESS',
                });
        }
    }
};
const successPostProfilePictures = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const { profilePicture } = action.payload.payload.data;
    const me = getMe(getState);
    if (me && typeof profilePicture === 'object') {
        const allIds = [profilePicture.id];
        const byId = { [profilePicture.id]: profilePicture };
        dispatch(setProfilePicturesAllId(allIds));
        dispatch(setProfilePicturesById(byId));
        dispatchUserCurrentProfilePicture(dispatch, me, {
            id: profilePicture.id,
        });
    }
};
const successProfilePicturesMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${PROFILE_PICTURES} ${API_SUCCESS}`) {
            switch (action.meta.method) {
                case 'DELETE':
                    successDeleteProfilePicture(dispatch, getState, action);
                    break;
                case 'GET':
                    successGetProfilePictures(dispatch, getState, action);
                    break;
                case 'POST':
                    successPostProfilePictures(dispatch, getState, action);
                    break;
                default:
                    successDefaultMethod(dispatch);
                    break;
            }
            dispatch(setLoading(false));
        }
    };
export const profilePicturesMiddlewares = [
    deleteProfilePicturesMiddleware,
    errorProfilePicturesMiddleware,
    getProfilePicturesMiddleware,
    postProfilePicturesMiddleware,
    resetProfilePicturesMiddleware,
    successProfilePicturesMiddleware,
];

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Reducers
// ----------------------------------
// ----------------------------------
// ----------------------------------
const profilePicturesAllIdsInitialState: string[] = [];
const profilePicturesAllIdsReducer = (
    state = profilePicturesAllIdsInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case PROFILE_PICTURES_ALL_ID_REMOVE:
            return state.filter(
                (profilePictureId) => profilePictureId !== action.payload
            );
        case PROFILE_PICTURES_ALL_ID_RESET:
            return profilePicturesAllIdsInitialState;
        case PROFILE_PICTURES_ALL_ID_SET:
            return [...state, ...action.payload];
        default:
            return state;
    }
};
const profilePicturesByIdInitialState: {
    [key: string]: Store.Models.ProfilePicture;
} = {};
const profilePicturesByIdReducer = (
    state = profilePicturesByIdInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case PROFILE_PICTURES_BY_ID_REMOVE: {
            const newState = { ...state };
            delete newState[action.payload];
            return { ...newState };
        }
        case PROFILE_PICTURES_BY_ID_RESET:
            return profilePicturesByIdInitialState;
        case PROFILE_PICTURES_BY_ID_SET:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
const profilePicturesCurrentInitialState: string | null = null;
const profilePicturesCurrentReducer = (
    state = profilePicturesCurrentInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case PROFILE_PICTURES_CURRENT_RESET:
            return profilePicturesCurrentInitialState;
        case PROFILE_PICTURES_CURRENT_UPDATE:
            return action.payload;
        default:
            return state;
    }
};
const profilePicturesPreviousInitialState: string | null = null;
const profilePicturesPreviousReducer = (
    state = profilePicturesPreviousInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case PROFILE_PICTURES_PREVIOUS_RESET:
            return profilePicturesPreviousInitialState;
        case PROFILE_PICTURES_PREVIOUS_UPDATE:
            return action.payload;
        default:
            return state;
    }
};
const profilePicturesStatusInitialState: Store.Status = 'PENDING';
const profilePicturesStatusReducer = (
    state = profilePicturesStatusInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case PROFILE_PICTURES_STATUS_RESET:
            return profilePicturesStatusInitialState;
        case PROFILE_PICTURES_STATUS_UPDATE:
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
export const profilePicturesReducer = combineReducers({
    allIds: profilePicturesAllIdsReducer,
    byId: profilePicturesByIdReducer,
    current: profilePicturesCurrentReducer,
    previous: profilePicturesPreviousReducer,
    status: profilePicturesStatusReducer,
});

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Selectors
// ----------------------------------
// ----------------------------------
// ----------------------------------
const selectMeId = (state: Store.Reducer) => state.me.id;
const selectProfilePicturesAllIds = (state: Store.Reducer) =>
    state.profilePictures.allIds;
const selectProfilePicturesById = (state: Store.Reducer) =>
    state.profilePictures.byId;
const selectProfilePicturesCurrent = (state: Store.Reducer) =>
    state.profilePictures.current;
const selectUsersById = (state: Store.Reducer) => state.users.byId;
const selectMe = createSelector(
    [selectMeId, selectUsersById],
    (meId, usersById) => {
        if (!meId) return undefined;
        return usersById[meId];
    }
);
const selectUsersCurrent = (state: Store.Reducer) => state.users.current;

export const selectCurrentProfilepicture = createSelector(
    [selectProfilePicturesById, selectProfilePicturesCurrent],
    (profilePicturesById, profilePicturesCurrent) => {
        if (!profilePicturesCurrent) return undefined;
        return profilePicturesById[profilePicturesCurrent];
    }
);
export const selectCurrentUserCurrentProfilePicture = createSelector(
    [selectProfilePicturesById, selectUsersById, selectUsersCurrent],
    (profilePicturesById, usersById, usersCurrent) => {
        if (!usersCurrent) return undefined;
        const user = usersById[usersCurrent];
        if (
            !user ||
            !user.currentProfilePicture ||
            !user.currentProfilePicture.id
        )
            return undefined;
        return profilePicturesById[user.currentProfilePicture.id];
    }
);
export const selectCurrentUserCurrentProfilePictureStatus = createSelector(
    [selectUsersById, selectUsersCurrent],
    (usersById, usersCurrent) => {
        if (!usersCurrent) return undefined;
        const user = usersById[usersCurrent];
        if (!user || !user.currentProfilePicture) return undefined;
        return user.currentProfilePicture.status;
    }
);
export const selectMeCurrentProfilePicture = createSelector(
    [selectMe, selectProfilePicturesById],
    (me, profilePicturesById) => {
        if (!me || !me.currentProfilePicture || !me.currentProfilePicture.id)
            return undefined;
        return profilePicturesById[me.currentProfilePicture.id];
    }
);
export const selectMeCurrentProfilePictureStatus = createSelector(
    [selectMe],
    (me) => {
        if (!me || !me.currentProfilePicture || !me.currentProfilePicture.id)
            return undefined;
        return me.currentProfilePicture.status;
    }
);
export const selectProfilePictures = createSelector(
    [selectProfilePicturesAllIds, selectProfilePicturesById],
    (profilePicturesAllIds, profilePicturesById) =>
        profilePicturesAllIds
            .map((id) => profilePicturesById[id])
            .filter((item) => !!item)
);
export const selectProfilePictureId = (profilePictureId: string) =>
    createSelector(
        [selectProfilePicturesById],
        (profilePicturesById) => profilePicturesById[profilePictureId]
    );
export const selectProfilePictureStatus = (state: Store.Reducer) =>
    state.profilePictures.status;
export const selectUserCurrentProfilePicture = (userId: string) =>
    createSelector(
        [selectProfilePicturesById, selectUsersById],
        (profilePicturesById, usersById) => {
            const user = usersById[userId];
            if (
                !user ||
                !user.currentProfilePicture ||
                !user.currentProfilePicture.id
            )
                return undefined;
            return profilePicturesById[user.currentProfilePicture.id];
        }
    );
export const selectUserCurrentProfilePictureStatus = (userId: string) =>
    createSelector([selectUsersById], (usersById) => {
        const user = usersById[userId];
        if (!user || !user.currentProfilePicture) return undefined;
        return user.currentProfilePicture.status;
    });
