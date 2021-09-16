import { AxiosError } from 'axios';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import request from '#helpers/request';
import { setComments, setFrames, setNotification } from '#store/actions';

type Values = {
    body: string;
};

const usePostComment = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = React.useState<boolean>(false);

    const postComment = React.useCallback(
        (
            values: Values,
            currentFrame: Store.Models.Frame,
            successCallBack?: (frame?: Store.Models.Frame) => void
        ) => {
            if (!loading) {
                setLoading(true);
                request({
                    body: values,
                    method: 'POST',
                    url: END_POINT.COMMENTS(currentFrame.id),
                })
                    .then((res) => {
                        if (
                            res.data.data.comment &&
                            typeof res.data.data.comment === 'object'
                        ) {
                            const { id } = res.data.data.comment;
                            const numOfComments =
                                res.data.data.numOfComments &&
                                typeof res.data.data.numOfComments === 'number'
                                    ? res.data.data.numOfComments
                                    : currentFrame.numOfComments;

                            const normalizedFrame = {
                                ...currentFrame,
                                comments: {
                                    ...currentFrame.comments,
                                    allIds: [
                                        id,
                                        ...currentFrame.comments.allIds,
                                    ],
                                },
                                numOfComments,
                            };
                            dispatch(
                                setComments({
                                    data: {
                                        byId: {
                                            [id]: {
                                                ...res.data.data.comment,
                                                comments: {
                                                    allIds: [],
                                                    status: 'SUCCESS',
                                                    end: true,
                                                },
                                            },
                                        },
                                    },
                                })
                            );
                            dispatch(
                                setFrames({
                                    data: {
                                        byId: {
                                            [currentFrame.id]: normalizedFrame,
                                        },
                                    },
                                })
                            );
                            if (successCallBack)
                                successCallBack(normalizedFrame);
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
                                if (err.response.data.errors.body) {
                                    dispatch(
                                        setNotification({
                                            status: 'error',
                                            text: err.response.data.errors.body,
                                        })
                                    );
                                } else {
                                    setNotification({
                                        status: 'error',
                                        text: ERROR_MESSAGE.DEFAULT_ERROR_MESSAGE,
                                    });
                                }
                            } else if (
                                typeof err.response.data.errors === 'string'
                            ) {
                                dispatch(
                                    setNotification({
                                        status: 'error',
                                        text: err.response.data.errors,
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
                    })
                    .finally(() => setLoading(false));
            }
        },
        []
    );

    return { loading, postComment };
};

export default usePostComment;
