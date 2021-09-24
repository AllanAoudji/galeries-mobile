import { AxiosError, AxiosResponse } from 'axios';
import { Middleware } from 'redux';
import { Dispatch } from 'hoist-non-react-statics/node_modules/@types/react';
import request from '#helpers/request';
import { ERROR_MESSAGE } from '#helpers/constants';

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Action types.
// ----------------------------------
// ----------------------------------
// ----------------------------------
export const API_ERROR = 'API_ERROR';
const API_REQUEST = 'API_REQUEST';
export const API_SUCCESS = 'API_SUCCESS';

// ----------------------------------
// ----------------------------------
// ----------------------------------
// Middlewares.
// ----------------------------------
// ----------------------------------
// ----------------------------------
export const apiError: ({
    payload,
    meta,
}: {
    payload: any;
    meta: Store.Meta;
}) => Store.Action = ({ payload, meta }) => ({
    meta,
    payload,
    type: `${meta.entity || '[ENTITY NOT FOUND]'} ${API_ERROR}`,
});
export const apiRequest: ({
    meta,
    payload,
}: {
    meta: Store.Meta;
    payload: { [key: string]: any };
}) => Store.Action = ({ meta, payload }) => ({
    meta,
    payload,
    type: `${meta.entity || '[ENTITY NOT FOUND]'} ${API_REQUEST}`,
});
export const apiSuccess: ({
    payload,
    meta,
}: {
    meta: Store.Meta;
    payload: AxiosResponse;
}) => Store.Action = ({ meta, payload }) => ({
    meta,
    payload,
    type: `${meta.entity || '[ENTITY NOT FOUND]'} ${API_SUCCESS}`,
});

const apiRequestSuccessMiddleware = (
    res: AxiosResponse,
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    dispatch(
        apiSuccess({
            meta: action.meta,
            payload: res,
        })
    );
};
const apiRequestErrorMiddleware = (
    err: AxiosError,
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    let error: any;
    if (err.response && err.response.data.errors)
        error = err.response.data.errors;
    else error = ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE;
    dispatch(
        apiError({
            meta: action.meta,
            payload: error,
        })
    );
};
const apiRequestMiddleware: Middleware<{}, Store.Reducer> =
    ({ dispatch }) =>
    (next) =>
    (action: Store.Action) => {
        if (
            action.type.includes(API_REQUEST) &&
            action.meta.entity &&
            action.meta.method &&
            action.meta.url
        ) {
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
        }
        return next(action);
    };

export const apiMiddlewares = [apiRequestMiddleware];
