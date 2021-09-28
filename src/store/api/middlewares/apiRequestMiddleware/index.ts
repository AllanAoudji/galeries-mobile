import { AxiosError, AxiosResponse } from 'axios';
import { Dispatch, Middleware } from 'redux';

import { ERROR_MESSAGE } from '#helpers/constants';
import request from '#helpers/request';
import { API_REQUEST, apiSuccess, apiError } from '#store/api';

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
    (action: Store.Action) => {
        if (action.type.includes(API_REQUEST))
            if (action.meta.entity && action.meta.method && action.meta.url)
                request({
                    body: action.payload,
                    method: action.meta.method,
                    url: action.meta.url,
                })
                    .then((res) =>
                        apiRequestSuccessMiddleware(res, dispatch, action)
                    )
                    .catch((err: AxiosError) =>
                        apiRequestErrorMiddleware(err, dispatch, action)
                    );
        return next(action);
    };

export default apiRequestMiddleware;
