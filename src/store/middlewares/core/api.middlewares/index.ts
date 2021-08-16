import { AxiosError } from 'axios';
import { Middleware } from 'redux';

import request from '#helpers/request';
import { API_REQUEST, apiSuccess } from '#store/actions';

const apiMiddleware: Middleware =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        const { payload } = action;
        if (action.type.includes(API_REQUEST)) {
            if (
                payload &&
                payload.meta &&
                payload.meta.entity &&
                payload.meta.method &&
                payload.meta.url
            ) {
                const { entity, method, url } = payload.meta;
                request({
                    body: payload.data,
                    method,
                    url,
                })
                    .then((res) => {
                        dispatch(apiSuccess(res.data, entity));
                    })
                    .catch((err: AxiosError) => {
                        console.log(err.response);
                    });
            }
        }
        return next(action);
    };

export default [apiMiddleware];
