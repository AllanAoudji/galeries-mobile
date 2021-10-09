import * as React from 'react';

import Footer from './Footer';
import Header from './Header';
import Slider from './Slider';

import { Container } from './styles';

type Props = {
    frame: Store.Models.Frame;
    onPressComments: () => void;
    onPressLikes: () => void;
    onPressSlider: () => void;
    showGalerie?: boolean;
};

const FrameCard = ({
    frame,
    onPressComments,
    onPressLikes,
    onPressSlider,
    showGalerie = false,
}: Props) => {
    const [currentIndex, setCurrentIndex] = React.useState<number>(0);

    return (
        <Container>
            <Header
                currentIndex={currentIndex}
                frame={frame}
                showGalerie={showGalerie}
            />
            <Slider
                currentIndex={currentIndex}
                frameId={frame.id}
                onPressSlider={onPressSlider}
                setCurrentIndex={setCurrentIndex}
            />
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
