import { AxiosError } from 'axios';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import request from '#helpers/request';
import { setNotification } from '#store/actions';

type Values = {
    betaKey: string;
    confirmPassword: string;
    email: string;
    password: string;
    userName: string;
};

const usePostSignin = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = React.useState<boolean>(false);
    const [serverErrors, setServerErrors] = React.useState<Values>({
        betaKey: '',
        confirmPassword: '',
        email: '',
        password: '',
        userName: '',
    });

    const signin = React.useCallback(
        (values: Values, successCallback?: () => void) => {
            if (!loading) {
                setLoading(true);
                request({
                    body: values,
                    method: 'POST',
                    url: END_POINT.SIGNIN,
                })
                    .then(() => {
                        if (successCallback) successCallback();
                    })
                    .catch((err: AxiosError) => {
                        if (err.response && err.response.data.errors) {
                            if (typeof err.response.data.errors === 'object') {
                                if (
                                    err.response.data.errors.betaKey ||
                                    err.response.data.errors.confirmPassword ||
                                    err.response.data.errors.email ||
                                    err.response.data.errors.password ||
                                    err.response.data.errors.userName
                                ) {
                                    setServerErrors({
                                        betaKey:
                                            err.response.data.errors.betaKey,
                                        confirmPassword:
                                            err.response.data.errors
                                                .confirmPassword,
                                        email: err.response.data.errors.email,
                                        password:
                                            err.response.data.errors.password,
                                        userName:
                                            err.response.data.errors.userName,
                                    });
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
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        },
        []
    );

    const resetServerErrorField = React.useCallback((field: keyof Values) => {
        setServerErrors((prevState) => ({
            ...prevState,
            [field]: '',
        }));
    }, []);

    return { loading, resetServerErrorField, serverErrors, signin };
};

export default usePostSignin;
