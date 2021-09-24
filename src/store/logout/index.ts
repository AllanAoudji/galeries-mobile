import { Middleware } from 'redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGOUT } from '#store/actions';
import { apiRequest, API_ERROR, API_SUCCESS } from '#store/api';
import { END_POINT } from '#helpers/constants';
import { resetComments } from '#store/comments';
import { resetFrames } from '#store/frames';
import { resetGaleriePictures } from '#store/galeriePictures';
import { setLoading } from '#store/loading';
import { resetGaleries } from '#store/galeries';
import { resetLikes } from '#store/likes';
import { resetLogin } from '#store/login';
import {
    dispatchErrorNotification,
    resetNotification,
} from '#store/notification';
import { resetMe } from '#store/me';
import { resetProfilePictures } from '#store/profilePictures';
import { resetUsers } from '#store/users';

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Action creators
// ----------------------------------
// ----------------------------------
// ----------------------------------
export const logout: () => Store.Action = () => ({
    meta: {},
    payload: {},
    type: LOGOUT,
});

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Middlewared
// ----------------------------------
// ----------------------------------
// ----------------------------------
const errorLogoutMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${LOGOUT} ${API_ERROR}`)
            dispatchErrorNotification(dispatch, action);
    };
const logoutMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === LOGOUT) {
            dispatch(setLoading(true));
            dispatch(
                apiRequest({
                    meta: {
                        entity: LOGOUT,
                        method: 'GET',
                        url: END_POINT.LOGOUT,
                    },
                    payload: {},
                })
            );
        }
    };
const successLogoutMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${LOGOUT} ${API_SUCCESS}`) {
            AsyncStorage.clear().finally(() => {
                dispatch(resetComments());
                dispatch(resetFrames());
                dispatch(resetGaleriePictures());
                dispatch(resetGaleries());
                dispatch(resetLikes());
                dispatch(resetLogin());
                dispatch(resetNotification());
                dispatch(resetMe());
                dispatch(resetProfilePictures());
                dispatch(resetUsers());
                dispatch(setLoading(false));
            });
        }
    };
export const logoutMiddlewares = [
    errorLogoutMiddleware,
    logoutMiddleware,
    successLogoutMiddleware,
];
