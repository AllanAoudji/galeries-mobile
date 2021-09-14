import { AxiosError } from 'axios';
import * as React from 'react';
import { useDispatch } from 'react-redux';

import { END_POINT, ERROR_MESSAGE } from '#helpers/constants';
import request from '#helpers/request';
import { setFrames, setNotification } from '#store/actions';

import Footer from './Footer';
import Header from './Header';
import Slider from './Slider';

import { Container } from './styles';

type Frame = Store.Models.Frame & {
    galerie?: Store.Models.Galerie;
    galeriePictures: Store.Models.GaleriePicture[];
    user?: Store.Models.User;
};
type Props = {
    frame: Frame;
    onPressLikes: (id: string) => void;
};

const FrameCard = ({ frame, onPressLikes }: Props) => {
    const dispatch = useDispatch();

    const handlePressLike = React.useCallback(() => {
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
    }, [frame]);

    const handlePressLikes = React.useCallback(() => {
        if (+frame.numOfLikes > 0) onPressLikes(frame.id);
    }, [frame, onPressLikes]);

    return (
        <Container>
            <Header user={frame.user} />
            <Slider galeriePictures={frame.galeriePictures} />
            <Footer
                createdAt={frame.createdAt}
                description={frame.description}
                handlePressLike={handlePressLike}
                handlePressLikes={handlePressLikes}
                liked={frame.liked}
                numOfComments={frame.numOfComments}
                numOfLikes={frame.numOfLikes}
            />
        </Container>
    );
};

export default FrameCard;
