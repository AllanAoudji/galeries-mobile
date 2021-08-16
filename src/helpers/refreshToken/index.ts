import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';

import {
    API,
    ASYNC_STORAGE,
    END_POINT,
    ERROR_MESSAGE,
} from '#helpers/constants';
import normalizeExpiresIn from '#helpers/normalizeExpiresIn';

export default async () => {
    let expiresIn: string | null;
    let token: string | null;

    try {
        expiresIn = await AsyncStorage.getItem(
            ASYNC_STORAGE.AUTH_TOKEN_EXPIRES_IN
        );
        token = await AsyncStorage.getItem(ASYNC_STORAGE.AUTH_TOKEN_TOKEN);
    } catch (err) {
        try {
            await AsyncStorage.clear();
        } catch (err2) {
            throw new Error(err2);
        }
        throw new Error(err);
    }

    if ((!expiresIn && token) || (expiresIn && !token)) {
        try {
            await AsyncStorage.clear();
            expiresIn = null;
            token = null;
        } catch (err) {
            throw new Error(err);
        }
    }

    if (expiresIn && token) {
        const isExpired = moment().isAfter(+expiresIn);
        if (isExpired) {
            try {
                const response = await axios.request({
                    method: 'GET',
                    baseURL: API,
                    url: END_POINT.REFRESH_TOKEN,
                    headers: {
                        authorization: token,
                        'Content-type': 'application/json',
                    },
                    withCredentials: true,
                });
                if (
                    !response.data.data &&
                    !response.data.data.expiresIn &&
                    typeof response.data.data.expiresIn !== 'number' &&
                    !response.data.data.token
                ) {
                    await AsyncStorage.clear();
                    throw new Error(ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE);
                }
                await AsyncStorage.setItem(
                    ASYNC_STORAGE.AUTH_TOKEN_TOKEN,
                    response.data.data.token
                );
                await AsyncStorage.setItem(
                    ASYNC_STORAGE.AUTH_TOKEN_EXPIRES_IN,
                    normalizeExpiresIn(response.data.data.expiresIn)
                );
                token = response.data.data.token;
            } catch (err) {
                try {
                    await AsyncStorage.clear();
                } catch (err2) {
                    throw new Error(err2);
                }
                throw new Error(err);
            }
        }
    }

    return token;
};
