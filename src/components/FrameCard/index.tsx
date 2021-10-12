import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { CurrentGaleriePictureProvider } from '#contexts/CurrentGaleriePictureContext';

import Footer from './Footer';
import Header from './Header';
import Slider from './Slider';

import { Container } from './styles';

type Props = {
    showGalerie?: boolean;
    frame?: Store.Models.Frame;
};

const FrameCard = ({ frame, showGalerie = false }: Props) => {
    const dimension = useWindowDimensions();

    if (!frame) return null;

    return (
        <CurrentGaleriePictureProvider>
            <Container width={dimension.width}>
                <Header frame={frame} showGalerie={showGalerie} />
                <Slider frame={frame} />
                <Footer frame={frame} />
            </Container>
        </CurrentGaleriePictureProvider>
    );
};

export default React.memo(FrameCard);
