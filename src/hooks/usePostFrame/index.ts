import { AxiosError } from 'axios';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import normalizeData from '#helpers/normalizeData';
import normalizeFrame from '#helpers/normalizeFrame';
import request from '#helpers/request';
import {
    setFrames,
    setGaleriePictures,
    setGaleries,
    setNotification,
} from '#store/actions';
import { currentGalerieSelector } from '#store/selectors';

type Values = {
    description: string;
};

const usePostFrame = () => {
    const dispatch = useDispatch();

    const currentGalerie = useSelector(currentGalerieSelector);

    const [loading, setLoading] = React.useState<boolean>(false);
    const [serverErrors, setServerErrors] = React.useState<Values>({
        description: '',
    });

    const postFrame = React.useCallback(
        (
            { description }: Values,
            picturesUri: string[],
            successCallback?: (frame?: Store.Models.Frame) => void
        ) => {
            if (currentGalerie && !loading && picturesUri.length) {
                setLoading(true);
                const formData = new FormData();
                picturesUri.forEach((pictureUri) => {
                    formData.append('image', {
                        // @ts-ignore
                        uri: pictureUri,
                        // TODO: Should transform pictureUri to 'image/...' and check if all files are images.
                        type: 'image/jpg',
                        name: pictureUri,
                    });
                });
                if (description !== '')
                    formData.append('description', description);
                request({
                    body: formData,
                    contentType: 'multipart/form-data',
                    method: 'POST',
                    url: END_POINT.GALERIE_FRAMES(currentGalerie.id),
                })
                    .then((res) => {
                        if (
                            res.data.data &&
                            res.data.data.frame &&
                            typeof res.data.data.frame === 'object'
                        ) {
                            const { galeriePicturesById, normalizedFrames } =
                                normalizeFrame(res.data.data.frame);
                            dispatch(
                                setGaleriePictures({
                                    byId: galeriePicturesById,
                                })
                            );
                            const normalized = normalizeData(normalizedFrames);
                            dispatch(setFrames({ data: normalized }));
                            dispatch(
                                setGaleries({
                                    data: {
                                        byId: {
                                            [currentGalerie.id]: {
                                                ...currentGalerie,
                                                frames: {
                                                    ...currentGalerie.frames,
                                                    allIds: [
                                                        ...normalized.allIds,
                                                        ...currentGalerie.frames
                                                            .allIds,
                                                    ],
                                                },
                                            },
                                        },
                                    },
                                })
                            );
                            if (successCallback)
                                successCallback(normalizedFrames[0]);
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
                                if (err.response.data.errors.description) {
                                    setServerErrors({
                                        description:
                                            err.response.data.errors
                                                .description,
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
                    })
                    .finally(() => setLoading(false));
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

    return { loading, postFrame, resetServerErrorField, serverErrors };
};

export default usePostFrame;
