import * as React from 'react';

import Footer from './Footer';
import Header from './Header';
import Slider from './Slider';

import { Container } from './styles';

type Props = {
    frame: Store.Models.Frame;
    onPressComments: () => void;
    onPressLikes: () => void;
    onPressLike: () => void;
    onPressOptions: () => void;
};

const FrameCard = ({
    frame,
    onPressComments,
    onPressLikes,
    onPressLike,
    onPressOptions,
}: Props) => {
    return (
        <Container>
            <Header userId={frame.userId} onPress={onPressOptions} />
            <Slider frameId={frame.id} />
            <Footer
                createdAt={frame.createdAt}
                description={frame.description}
                handlePressComments={onPressComments}
                handlePressLike={onPressLike}
                handlePressLikes={onPressLikes}
                liked={frame.liked}
                numOfComments={frame.numOfComments}
                numOfLikes={frame.numOfLikes}
            />
        </Container>
    );
};

export default React.memo(FrameCard);
