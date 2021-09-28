import * as React from 'react';
import { useDispatch } from 'react-redux';

import { postLike } from '#store/likes';

import Footer from './Footer';
import Header from './Header';
import Slider from './Slider';

import { Container } from './styles';

type Props = {
    frame: Store.Models.Frame;
    onPressComments: (id: string) => void;
    onPressLikes: (id: string) => void;
};

const FrameCard = ({ frame, onPressComments, onPressLikes }: Props) => {
    const dispatch = useDispatch();

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

    return (
        <Container>
            <Header userId={frame.userId} />
            <Slider frameId={frame.id} />
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

export default React.memo(FrameCard);
