import AsyncStorage from '@react-native-async-storage/async-storage';
import { Middleware } from 'redux';

import { END_POINT } from '#helpers/constants';
import {
    API_SUCCESS,
    LOGOUT_FETCH,
    LOGOUT,
    apiRequest,
    resetUser,
} from '#store/actions';

const fetchLogout: Middleware =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === LOGOUT_FETCH) {
            dispatch(
                apiRequest({
                    entity: '[LOGOUT]',
                    method: 'GET',
                    url: END_POINT.LOGOUT,
                })
            );
        }
    };

const successLogout: Middleware =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${LOGOUT} ${API_SUCCESS}`) {
            AsyncStorage.clear().finally(() => dispatch(resetUser()));
        }
    };

export default [fetchLogout, successLogout];
