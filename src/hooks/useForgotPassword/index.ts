import { AxiosError } from 'axios';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import request from '#helpers/request';
import { setNotification } from '#store/actions';

type Values = {
    email: string;
};

const useForgotPassword = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = React.useState<boolean>(false);
    const [serverErrors, setServerErrors] = React.useState<Values>({
        email: '',
    });

    const forgotPassword = React.useCallback(
        (values: Values, successCallback?: () => void) => {
            request({
                body: values,
                method: 'POST',
                url: END_POINT.FORGOT_PASSWORD,
            })
                .then(() => {
                    if (successCallback) successCallback();
                })
                .catch((err: AxiosError) => {
                    if (err.response && err.response.data.errors) {
                        if (typeof err.response.data.errors === 'object') {
                            if (err.response.data.errors.email) {
                                setServerErrors({
                                    email: err.response.data.errors.email,
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
        },
        []
    );

    const resetServerErrorField = React.useCallback((field: keyof Values) => {
        setServerErrors((prevState) => ({
            ...prevState,
            [field]: '',
        }));
    }, []);

    return { forgotPassword, loading, resetServerErrorField, serverErrors };
};

export default useForgotPassword;
