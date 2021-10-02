import axios, { Method } from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { API, ASYNC_STORAGE } from '#helpers/constants';
import refreshToken from '#helpers/refreshToken';

export default async ({
    body,
    method,
    url,
    contentType,
    confirmToken,
}: {
    body: any;
    method: Method;
    url: string;
    contentType?: string;
    confirmToken?: string;
}) => {
    let token: string | null = null;

    try {
        // token = await refreshToken();
        token = await AsyncStorage.getItem(ASYNC_STORAGE.AUTH_TOKEN_TOKEN);
    } catch (err) {
        throw new Error(err);
    }

    return axios.request({
        data: body,
        method,
        baseURL: API,
        url,
        headers: {
            authorization: token,
            'Content-type': contentType || 'application/json',
            confirmation: confirmToken,
        },
        withCredentials: true,
    });
};
