import { AxiosResponse } from 'axios';

import { API_ERROR, API_REQUEST, API_SUCCESS } from '#store/api/actionTypes';

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
