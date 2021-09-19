import { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { ASYNC_STORAGE, END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import request from '#helpers/request';
import { fetchMe, setNotification } from '#store/actions';

type Values = {
    password: string;
    userNameOrEmail: string;
};

const usePostLogin = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = React.useState<boolean>(false);
    const [serverErrors, setServerErrors] = React.useState<Values>({
        password: '',
        userNameOrEmail: '',
    });

    const login = React.useCallback(async (values: Values) => {
        if (!loading) {
            setLoading(true);
            request({
                body: values,
                method: 'POST',
                url: END_POINT.LOGIN,
            })
                .then(async (res) => {
                    if (
                        !res.data.data &&
                        !res.data.data.expiresIn &&
                        typeof res.data.data.expiresIn !== 'number' &&
                        !res.data.data.token &&
                        typeof res.data.data.token !== 'string'
                    ) {
                        dispatch(
                            setNotification({
                                text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                                status: 'error',
                            })
                        );
                    } else {
                        try {
                            const normalizeExpiredIn = moment()
                                .add(res.data.data.expiresIn, 's')
                                .valueOf()
                                .toString();
                            await AsyncStorage.setItem(
                                ASYNC_STORAGE.AUTH_TOKEN_EXPIRES_IN,
                                normalizeExpiredIn
                            );
                            await AsyncStorage.setItem(
                                ASYNC_STORAGE.AUTH_TOKEN_TOKEN,
                                res.data.data.token
                            );
                            dispatch(fetchMe());
                        } catch (err) {
                            dispatch(
                                setNotification({
                                    text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                                    status: 'error',
                                })
                            );
                        }
                    }
                })
                .catch((err: AxiosError) => {
                    if (err.response && err.response.data.errors) {
                        if (typeof err.response.data.errors === 'object') {
                            if (
                                err.response.data.errors.password ||
                                err.response.data.errors.userNameOrEmail
                            ) {
                                setServerErrors({
                                    password:
                                        err.response.data.errors.password || '',
                                    userNameOrEmail:
                                        err.response.data.errors
                                            .userNameOrEmail || '',
                                });
                            } else {
                                dispatch(
                                    setNotification({
                                        text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                                        status: 'error',
                                    })
                                );
                            }
                        } else if (
                            typeof err.response.data.errors === 'string'
                        ) {
                            if (
                                err.response.data.errors ===
                                ERROR_MESSAGE.USER_SHOULD_NOT_BE_AUTHENTICATED
                            ) {
                                dispatch(fetchMe());
                            } else {
                                dispatch(
                                    setNotification({
                                        text: err.response.data.errors,
                                        status: 'error',
                                    })
                                );
                            }
                        } else {
                            dispatch(
                                setNotification({
                                    text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                                    status: 'error',
                                })
                            );
                        }
                    } else {
                        dispatch(
                            setNotification({
                                text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                                status: 'error',
                            })
                        );
                    }
                })
                .finally(() => setLoading(false));
        }
    }, []);

    const resetServerErrorField = React.useCallback((field: keyof Values) => {
        setServerErrors((prevState) => ({
            ...prevState,
            [field]: '',
        }));
    }, []);

    return { loading, login, resetServerErrorField, serverErrors };
};

export default usePostLogin;
