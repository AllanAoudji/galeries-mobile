import { AxiosError } from 'axios';
import { Middleware } from 'redux';

import { ERROR_MESSAGE } from '#helpers/constants';
import request from '#helpers/request';
import {
    API_REQUEST,
    apiError,
    apiSuccess,
    setNotification,
} from '#store/actions';

const apiMiddleware: Middleware =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        const { payload } = action;
        if (action.type.includes(API_REQUEST)) {
            if (
                !!payload.meta.entity &&
                !!payload.meta.method &&
                !!payload.meta.url
            ) {
                const { entity, method, url } = payload.meta;
                request({
                    body: payload.data || {},
                    method,
                    url,
                })
                    .then((res) => {
                        dispatch(
                            apiSuccess({
                                response: res.data,
                                meta: { ...payload.meta },
                            })
                        );
                    })
                    .catch((err: AxiosError) => {
                        let error: string;
                        if (
                            err.response &&
                            err.response.data.errors &&
                            typeof err.response.data.errors === 'string'
                        ) {
                            error = err.response.data.errors;
                        } else {
                            error = ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE;
                        }
                        dispatch(apiError(error, entity));
                    });
            } else {
                dispatch(
                    setNotification({
                        status: 'error',
                        text: 'wrong request',
                    })
                );
            }
        }
        return next(action);
    };

export default [apiMiddleware];
