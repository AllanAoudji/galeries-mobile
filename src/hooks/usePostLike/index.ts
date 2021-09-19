import { AxiosError } from 'axios';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import request from '#helpers/request';
import { END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import { setFrames, setNotification } from '#store/actions';

const usePostLike = () => {
    const dispatch = useDispatch();

    const like = React.useCallback((frame: Store.Models.Frame) => {
        request({
            body: {},
            method: 'POST',
            url: END_POINT.LIKES(frame.id),
        })
            .then((res) => {
                if (
                    res.data.data &&
                    res.data.data.liked !== undefined &&
                    res.data.data.numOfLikes !== undefined
                ) {
                    dispatch(
                        setFrames({
                            data: {
                                byId: {
                                    [frame.id]: {
                                        autoIncrementId: frame.autoIncrementId,
                                        createdAt: frame.createdAt,
                                        comments: frame.comments,
                                        description: frame.description,
                                        galerieId: frame.galerieId,
                                        galeriePicturesId:
                                            frame.galeriePicturesId,
                                        id: frame.id,
                                        liked: res.data.data.liked,
                                        likes: frame.likes,
                                        numOfComments: frame.numOfComments,
                                        numOfLikes: res.data.data.numOfLikes,
                                        updatedAt: frame.updatedAt,
                                        userId: frame.userId,
                                    },
                                },
                            },
                        })
                    );
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
                if (err.response) {
                    if (
                        err.response.data &&
                        err.response.data.errors &&
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
                                status: 'error',
                                text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                            })
                        );
                    }
                } else {
                    dispatch(
                        setNotification({
                            status: 'error',
                            text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                        })
                    );
                }
            });
    }, []);

    return { like };
};

export default usePostLike;
