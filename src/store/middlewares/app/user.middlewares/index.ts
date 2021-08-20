import AsyncStorage from '@react-native-async-storage/async-storage';
import { Middleware } from 'redux';

import { ERROR_MESSAGE, END_POINT } from '#helpers/constants';
import {
    API_ERROR,
    API_SUCCESS,
    USER,
    USER_FETCH,
    apiRequest,
    setNotification,
    setUser,
} from '#store/actions';

const errorUser: Middleware =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${USER} ${API_ERROR}`) {
            AsyncStorage.clear().finally(() => {
                dispatch(
                    setNotification({
                        status: 'error',
                        text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                    })
                );
                dispatch(setUser({ data: null, status: 'ERROR' }));
            });
        }
    };

const fetchUser: Middleware =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === USER_FETCH) {
            dispatch(
                setUser({
                    status: 'FETCHING',
                })
            );
            dispatch(
                apiRequest({
                    data: {},
                    meta: {
                        entity: USER,
                        method: 'GET',
                        url: END_POINT.GET_ME,
                    },
                })
            );
        }
    };

const successUser: Middleware =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${USER} ${API_SUCCESS}`) {
            if (action.payload) {
                if (action.payload.data.action === 'GET') {
                    dispatch(
                        setUser({
                            data: action.payload.data.data.user,
                            status: 'SUCCESS',
                        })
                    );
                }
            }
        }
    };

export default [errorUser, fetchUser, successUser];
