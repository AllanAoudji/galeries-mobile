import AsyncStorage from '@react-native-async-storage/async-storage';
import { Middleware } from 'redux';

import { API_SUCCESS } from '#store/api';
import { resetComments } from '#store/comments';
import { resetFrames } from '#store/frames';
import { resetGaleries } from '#store/galeries';
import { resetGaleriePictures } from '#store/galeriePictures';
import { LOGOUT } from '#store/genericActionTypes';
import { resetLikes } from '#store/likes';
import { resetLogin } from '#store/login';
import { updateLogoutStatus } from '#store/logout';
import { resetNotification } from '#store/notification';
import { resetMe } from '#store/me';
import { resetProfilePictures } from '#store/profilePictures';
import { resetUsers } from '#store/users';

const successLogoutMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${LOGOUT} ${API_SUCCESS}`) {
            AsyncStorage.clear().finally(() => {
                dispatch(resetComments());
                dispatch(resetFrames());
                dispatch(resetGaleries());
                dispatch(resetGaleriePictures());
                dispatch(resetLikes());
                dispatch(resetLogin());
                dispatch(resetNotification());
                dispatch(resetMe());
                dispatch(resetProfilePictures());
                dispatch(resetUsers());
                dispatch(updateLogoutStatus('SUCCESS'));
            });
        }
    };

export default successLogoutMiddleware;
