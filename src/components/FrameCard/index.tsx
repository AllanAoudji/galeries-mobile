import * as React from 'react';
import { CurrentGaleriePictureProvider } from '#contexts/CurrentGaleriePictureContext';

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
    return (
        <CurrentGaleriePictureProvider>
            <Container>
                <Header frame={frame} showGalerie={showGalerie} />
                <Slider frame={frame} onPressSlider={onPressSlider} />
                <Footer
                    createdAt={frame.createdAt}
                    description={frame.description}
                    frameId={frame.id}
                    handlePressComments={onPressComments}
                    handlePressLikes={onPressLikes}
                />
            </Container>
        </CurrentGaleriePictureProvider>
    );
};

export default FrameCard;
