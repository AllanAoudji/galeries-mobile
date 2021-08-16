import { AxiosResponse, Method } from 'axios';

export const API_ERROR = 'API_ERROR';
export const API_REQUEST = 'API_REQUEST';
export const API_SUCCESS = 'API_SUCCESS';

type Data = {
    body?: any;
    entity: Store.Entity;
    method: Method;
    params?: string;
    url: string;
};

export const apiRequest: (data: Data) => Store.Action = ({
    body,
    entity,
    method,
    params,
    url,
}) => ({
    payload: {
        data: body,
        meta: {
            entity,
            method,
            params,
            url,
        },
    },
    type: `${entity} ${API_REQUEST}`,
});

export const apiSuccess: (
    response: AxiosResponse,
    entity: Store.Entity
) => Store.Action = (response, entity) => ({
    payload: {
        data: response,
        meta: {
            entity,
        },
    },
    type: `${entity} ${API_SUCCESS}`,
});
