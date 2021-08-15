import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { Method } from 'axios';

import { API } from '#helpers/constants';

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
    let authToken: string | null;
    try {
        authToken = await AsyncStorage.getItem('@authToken_token');
    } catch (err) {
        throw new Error(err);
    }
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
