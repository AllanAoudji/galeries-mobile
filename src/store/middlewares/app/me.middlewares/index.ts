import AsyncStorage from '@react-native-async-storage/async-storage';
import { Middleware } from 'redux';

import { ERROR_MESSAGE, END_POINT } from '#helpers/constants';
import {
    API_ERROR,
    API_SUCCESS,
    ME,
    ME_FETCH,
    apiRequest,
    setNotification,
    setMe,
    setUsers,
} from '#store/actions';
import normalizeData from '#helpers/normalizeData';

const errorUser: Middleware =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === `${ME} ${API_ERROR}`) {
            AsyncStorage.clear().finally(() => {
                dispatch(
                    setNotification({
                        status: 'error',
                        text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                    })
                );
                dispatch(setMe({ id: null, status: 'ERROR' }));
            });
        }
    };

const fetchUser: Middleware =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        next(action);
        if (action.type === ME_FETCH) {
            dispatch(setMe({ status: 'FETCHING' }));
            dispatch(
                apiRequest({
                    data: {},
                    meta: {
                        entity: ME,
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
        if (action.type === `${ME} ${API_SUCCESS}`) {
            if (action.payload) {
                if (
                    action.payload.data.action === 'GET' &&
                    typeof action.payload.data.data.user === 'object' &&
                    typeof action.payload.data.data.user.id === 'string'
                ) {
                    const { byId } = normalizeData(
                        action.payload.data.data.user
                    );
                    dispatch(
                        setMe({
                            id: action.payload.data.data.user.id,
                            status: 'SUCCESS',
                        })
                    );
                    dispatch(setUsers({ byId }));
                }
            }
        }
    };

export default [errorUser, fetchUser, successUser];
