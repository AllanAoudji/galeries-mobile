import { AxiosResponse } from 'axios';

export const API_ERROR = 'API_ERROR';
export const API_REQUEST = 'API_REQUEST';
export const API_SUCCESS = 'API_SUCCESS';

export const apiError: (error: string, entity: Store.Entity) => Store.Action = (
    error,
    entity
) => ({
    payload: {
        data: error,
        meta: {
            entity,
        },
    },
    type: `${entity} ${API_ERROR}`,
});

export const apiRequest: ({
    data,
    meta,
}: {
    data?: any;
    meta: Store.Meta;
}) => Store.Action = ({ data, meta }) => ({
    payload: {
        data: data || {},
        meta: meta || {},
    },
    type: `${meta.entity || '[ENTITY NOT FOUND]'} ${API_REQUEST}`,
});

export const apiSuccess: ({
    response,
    meta,
}: {
    response: AxiosResponse;
    meta: Store.Meta;
}) => Store.Action = ({ response, meta }) => ({
    payload: {
        data: response,
        meta,
    },
    type: `${meta.entity || '[ENTITY NOT FOUND]'} ${API_SUCCESS}`,
});
