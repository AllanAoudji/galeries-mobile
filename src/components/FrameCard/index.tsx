import * as React from 'react';

import { useLike } from '#hooks';

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
    onPressComments: (id: string) => void;
    onPressLikes: (id: string) => void;
};

const FrameCard = ({ frame, onPressComments, onPressLikes }: Props) => {
    const { like } = useLike();

    const handlePressComments = React.useCallback(
        () => onPressComments(frame.id),
        [frame]
    );
    const handlePressLike = React.useCallback(() => {
        like(frame);
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
