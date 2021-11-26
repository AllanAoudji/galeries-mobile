import axios, { AxiosError, AxiosResponse } from 'axios';
import { Dispatch, Middleware } from 'redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {
    API,
    ASYNC_STORAGE,
    END_POINT,
    ERROR_MESSAGE,
} from '#helpers/constants';
import { apiSuccess, apiError } from '#store/api/actionCreators';
import { API_REQUEST } from '#store/api/actionTypes';
import normalizeExpiresIn from '#helpers/normalizeExpiresIn';
import resetStore from '#store/resetStore';

const apiRequestSuccessMiddleware = (
    response: AxiosResponse,
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    dispatch(
        apiSuccess({
            meta: action.meta,
            payload: response.data,
        })
    );
};
const apiRequestErrorMiddleware = (
    error: AxiosError,
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    let err: any;
    if (error.response && error.response.data.errors)
        err = error.response.data.errors;
    else err = ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE;
    dispatch(
        apiError({
            meta: action.meta,
            payload: err,
        })
    );
};
const apiRequestMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    async (action: Store.Action) => {
        if (
            action &&
            typeof action.type === 'string' &&
            action.type.includes(API_REQUEST)
        ) {
            if (action.meta.entity && action.meta.method && action.meta.url) {
                let expiresIn: string | null = null;
                let token: string | null = null;
                try {
                    expiresIn = await AsyncStorage.getItem(
                        ASYNC_STORAGE.AUTH_TOKEN_EXPIRES_IN
                    );
                    token = await AsyncStorage.getItem(
                        ASYNC_STORAGE.AUTH_TOKEN_TOKEN
                    );
                } catch (err) {
                    await AsyncStorage.clear();
                }
                if ((!expiresIn && token) || (expiresIn && !token)) {
                    try {
                        await AsyncStorage.clear();
                        expiresIn = null;
                        token = null;
                    } catch (err) {
                        if (err instanceof Error) throw new Error(err.message);
                    }
                }
                if (expiresIn && token) {
                    const isExpired = moment().isAfter(+expiresIn);
                    if (isExpired) {
                        try {
                            const response = await axios.request({
                                method: 'GET',
                                baseURL: API,
                                url: `${END_POINT.USERS}${END_POINT.REFRESH_TOKEN}`,
                                headers: {
                                    authorization: token,
                                    'Content-type': 'application/json',
                                },
                                withCredentials: true,
                            });
                            if (
                                !response.data.data &&
                                !response.data.data.expiresIn &&
                                typeof response.data.data.expiresIn !==
                                    'number' &&
                                !response.data.data.token
                            ) {
                                await AsyncStorage.clear();
                                throw new Error(
                                    ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE
                                );
                            }
                            await AsyncStorage.setItem(
                                ASYNC_STORAGE.AUTH_TOKEN_TOKEN,
                                response.data.data.token
                            );
                            await AsyncStorage.setItem(
                                ASYNC_STORAGE.AUTH_TOKEN_EXPIRES_IN,
                                normalizeExpiresIn(response.data.data.expiresIn)
                            );
                            token = response.data.data.token;
                        } catch (err) {
                            await AsyncStorage.clear();
                            if (err instanceof Error)
                                throw new Error(err.message);
                        }
                    }
                }
                try {
                    const response = await axios.request({
                        data: action.payload,
                        method: action.meta.method,
                        baseURL: API,
                        url: action.meta.url,
                        headers: {
                            authorization: token,
                            'Content-type': 'application/json',
                        },
                        withCredentials: true,
                    });
                    apiRequestSuccessMiddleware(response, dispatch, action);
                } catch (err) {
                    if (axios.isAxiosError(err)) {
                        if (
                            err.response &&
                            err.response.data &&
                            err.response.data.errors === 'No auth token'
                        )
                            resetStore(dispatch);
                        apiRequestErrorMiddleware(err, dispatch, action);
                    }
                }
            }
        }
        return next(action);
    };

export default apiRequestMiddleware;
