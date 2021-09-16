import { AxiosError } from 'axios';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import normalizeData from '#helpers/normalizeData';
import request from '#helpers/request';
import { resetGaleries, setGaleries, setNotification } from '#store/actions';

type Values = {
    description: string;
    name: string;
};

const usePostGalerie = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = React.useState<boolean>(false);
    const [serverErrors, setServerErrors] = React.useState<Values>({
        description: '',
        name: '',
    });

    const postGalerie = React.useCallback(
        async (
            values: Values,
            success?: (galerie: Store.Models.Galerie) => void
        ) => {
            if (!loading) {
                setLoading(true);
                request({
                    body: values,
                    method: 'POST',
                    url: END_POINT.GALERIES,
                })
                    .then((res) => {
                        if (
                            res.data &&
                            res.data.data.galerie &&
                            typeof res.data.data.galerie === 'object'
                        ) {
                            const normalizedGalerie: Store.Models.Galerie = {
                                ...res.data.data.galerie,
                                frames: {
                                    allIds: [],
                                    end: true,
                                    status: 'SUCCESS',
                                },
                                users: {
                                    allIds: [],
                                    end: true,
                                    status: 'SUCCESS',
                                },
                            };
                            const normalizedData =
                                normalizeData(normalizedGalerie);
                            dispatch(
                                setGaleries({
                                    data: normalizedData,
                                    meta: {},
                                })
                            );
                            dispatch(resetGaleries());
                            if (success) success(normalizedGalerie);
                        } else {
                            dispatch(
                                setNotification({
                                    status: 'error',
                                    text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                                })
                            );
                        }
                    })
                    .catch((err: AxiosError) => {
                        if (err.response && err.response.data.errors) {
                            if (typeof err.response.data.errors === 'object') {
                                if (
                                    err.response.data.errors.name ||
                                    err.response.data.errors.description
                                ) {
                                    setServerErrors({
                                        description:
                                            err.response.data.errors
                                                .description || '',
                                        name:
                                            err.response.data.errors.name || '',
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
                                dispatch(
                                    setNotification({
                                        text: err.response.data.errors,
                                        status: 'error',
                                    })
                                );
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

    return {
        loading,
        postGalerie,
        resetServerErrorField,
        serverErrors,
    };
};

export default usePostGalerie;
