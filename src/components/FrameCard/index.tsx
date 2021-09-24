import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    getFrameGaleriePictures,
    selectFrameGaleriePictures,
    selectFrameGaleriePicturesStatus,
} from '#store/galeriePictures';
import { postLike } from '#store/likes';

import Footer from './Footer';
import Header from './Header';
import Slider from './Slider';

import { Container } from './styles';

type Props = {
    frame: Store.Models.FramePopulated;
    onPressComments: (id: string) => void;
    onPressLikes: (id: string) => void;
};

const FrameCard = ({ frame, onPressComments, onPressLikes }: Props) => {
    const dispatch = useDispatch();

    const selectGaleriePictures = React.useCallback(
        () => selectFrameGaleriePictures(frame.id),
        [frame]
    );
    const galeriePictures = useSelector(selectGaleriePictures());
    const selectGaleriePicturesStatus = React.useCallback(
        () => selectFrameGaleriePicturesStatus(frame.id),
        [frame]
    );
    const galeriePicturesStatus = useSelector(selectGaleriePicturesStatus());

    const handlePressComments = React.useCallback(
        () => onPressComments(frame.id),
        [frame]
    );
    const handlePressLike = React.useCallback(
        () => dispatch(postLike(frame.id)),
        [frame]
    );
    const handlePressLikes = React.useCallback(() => {
        if (+frame.numOfLikes > 0) onPressLikes(frame.id);
    }, [frame, onPressLikes]);

    React.useEffect(() => {
        if (galeriePicturesStatus === 'PENDING')
            dispatch(getFrameGaleriePictures(frame.id));
    }, [frame, galeriePicturesStatus]);

    return (
        <Container>
            <Header user={frame.user} />
            <Slider galeriePictures={galeriePictures} />
            <Footer
                createdAt={frame.createdAt}
                description={frame.description}
                handlePressComments={handlePressComments}
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
