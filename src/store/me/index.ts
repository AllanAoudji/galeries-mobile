import { Dispatch, Middleware, combineReducers } from 'redux';
import { createSelector } from 'reselect';

import { END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import { API_ERROR, apiRequest, API_SUCCESS } from '#store/api';
import {
    DELETE,
    ME,
    GET,
    ID,
    PUT,
    RESET,
    STATUS,
    UPDATE,
} from '#store/genericActionTypes';
import { dispatchErrorNotification } from '#store/notification';
import { setUsersById } from '#store/users';

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Action types
// ----------------------------------
// ----------------------------------
// ----------------------------------
const ME_DELETE = `${ME} ${DELETE}`;
const ME_GET = `${ME} ${GET}`;
const ME_PUT = `${ME} ${PUT}`;
const ME_RESET = `${ME} ${RESET}`;

const ME_ID_RESET = `${ME}${ID} ${RESET}`;
const ME_ID_UPDATE = `${ME}${ID} ${UPDATE}`;

const ME_STATUS_RESET = `${ME}${STATUS} ${RESET}`;
const ME_STATUS_UPDATE = `${ME}${STATUS} ${UPDATE}`;

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Actions
// ----------------------------------
// ----------------------------------
// ----------------------------------
export const deleteMe: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: ME_DELETE,
});
export const getMe: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: ME_GET,
});
export const putMe: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: ME_PUT,
});
export const resetMe: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: ME_RESET,
});

const resetMeId: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: ME_ID_RESET,
});
const updateMeId: (payload: string) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: ME_ID_UPDATE,
});

const resetMeStatus: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: ME_STATUS_RESET,
});
const updateMeStatus: (payload: Store.Status) => Store.Action = (payload) => ({
    meta: {},
    payload,
    type: ME_STATUS_UPDATE,
});

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Dispatchers
// ----------------------------------
// ----------------------------------
// ----------------------------------
const dispatchGetMe: (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => void = (dispatch, action) => {
    dispatch(
        apiRequest({
            payload: {},
            meta: {
                ...action.meta,
                entity: ME,
                method: 'GET',
                url: END_POINT.GET_ME,
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
const getMeStatus = (getState: () => Store.Reducer) => getState().me.status;

const errorMeMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${ME} ${API_ERROR}`) {
            dispatch(updateMeStatus('ERROR'));
            dispatchErrorNotification(dispatch, action);
        }
    };
const getMeMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch, getState }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        const meStatus = getMeStatus(getState);
        if (action.type === ME_GET && meStatus !== 'LOADING') {
            dispatch(updateMeStatus('LOADING'));
            dispatchGetMe(dispatch, action);
        }
    };
const resetMeMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === ME_RESET) {
            dispatch(resetMeId());
            dispatch(resetMeStatus());
        }
    };
const successDefaultMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    const name = action.meta.query ? action.meta.query.name : undefined;
    if (typeof name === 'string') dispatch(updateMeStatus('ERROR'));
    dispatchErrorNotification(dispatch, ERROR_MESSAGE.METHOD_NOT_FOUND);
};
const successGetMe = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    const { user } = action.payload.data.data;
    if (typeof user === 'object' && typeof user.id === 'string') {
        dispatch(updateMeStatus('SUCCESS'));
        dispatch(updateMeId(user.id));
        dispatch(setUsersById({ [user.id]: user }));
    } else {
        dispatch(updateMeStatus('ERROR'));
        dispatchErrorNotification(
            dispatch,
            ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE
        );
    }
};
const successMeMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${ME} ${API_SUCCESS}`) {
            switch (action.meta.method) {
                case 'DELETE':
                    break;
                case 'PUT':
                    break;
                case 'GET':
                    successGetMe(dispatch, action);
                    break;
                default:
                    successDefaultMethod(dispatch, action);
            }
        }
    };

export const meMiddlewares = [
    errorMeMiddleware,
    getMeMiddleware,
    resetMeMiddleware,
    successMeMiddleware,
];

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Reducers
// ----------------------------------
// ----------------------------------
// ----------------------------------
const meIdInitialState: string | null = null;
const meIdReducer = (state = meIdInitialState, action: Store.Action) => {
    switch (action.type) {
        case ME_ID_RESET:
            return meIdInitialState;
        case ME_ID_UPDATE:
            return action.payload;
        default:
            return state;
    }
};
const meStatusInitialState: Store.Status = 'PENDING';
const meStatusReducer = (
    state = meStatusInitialState,
    action: Store.Action
) => {
    switch (action.type) {
        case ME_STATUS_RESET:
            return meStatusInitialState;
        case ME_STATUS_UPDATE:
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
export const meReducer = combineReducers({
    id: meIdReducer,
    status: meStatusReducer,
});

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Selectors
// ----------------------------------
// ----------------------------------
// ----------------------------------
const selectMeId = (state: Store.Reducer) => state.me.id;
const selectUsersById = (state: Store.Reducer) => state.users.byId;
export const selectMeStatus = (state: Store.Reducer) => state.me.status;
export const selectMe = createSelector(
    [selectUsersById, selectMeId],
    (byId, id) => {
        if (!id) return undefined;
        return byId[id];
    }
);
