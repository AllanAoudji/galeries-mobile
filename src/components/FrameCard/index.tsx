import * as React from 'react';

import Footer from './Footer';
import Header from './Header';
import Slider from './Slider';

import { Container } from './styles';

type Props = {
    frame: Store.Models.Frame;
    onPressComments: () => void;
    onPressLikes: () => void;
    onPressOptions: () => void;
    onPressSlider: () => void;
    showGalerie?: boolean;
};

const FrameCard = ({
    frame,
    onPressComments,
    onPressLikes,
    onPressOptions,
    onPressSlider,
    showGalerie = false,
}: Props) => {
    return (
        <Container>
            <Header
                galerieId={frame.galerieId}
                onPress={onPressOptions}
                showGalerie={showGalerie}
                userId={frame.userId}
            />
            <Slider frameId={frame.id} onPressSlider={onPressSlider} />
            <Footer
                createdAt={frame.createdAt}
                description={frame.description}
                frameId={frame.id}
                handlePressComments={onPressComments}
                handlePressLikes={onPressLikes}
            />
        </Container>
    );
};

export default React.memo(FrameCard);
