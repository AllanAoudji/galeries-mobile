import axios, { Method } from 'axios';

import { API } from '#helpers/constants';

export default ({
    body,
    method,
    url,
    authToken,
    contentType,
    confirmToken,
}: {
    body: any;
    method: Method;
    url: string;
    authToken: string;
    contentType?: string;
    confirmToken?: string;
}) => {
    return axios.request({
        data: body,
        method,
        baseURL: API,
        url,
        headers: {
            authorization: authToken,
            'Content-type': contentType || 'application/json',
            confirmation: confirmToken,
        },
        withCredentials: true,
    });
};
