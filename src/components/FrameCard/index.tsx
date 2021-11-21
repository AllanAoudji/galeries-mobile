import * as React from 'react';
import { useWindowDimensions } from 'react-native';

import { CurrentGaleriePictureProvider } from '#contexts/CurrentGaleriePictureContext';

import Footer from './Footer';
import Header from './Header';
import Slider from './Slider';

import { Container } from './styles';

type Props = {
    frame?: Store.Models.Frame;
    type?: 'galerie' | 'user';
};

const FrameCard = ({ frame, type }: Props) => {
    const dimension = useWindowDimensions();

    if (!frame) return null;

    return (
        <CurrentGaleriePictureProvider>
            <Container width={dimension.width}>
                <Header frame={frame} type={type} />
                <Slider frame={frame} />
                <Footer frame={frame} />
            </Container>
        </CurrentGaleriePictureProvider>
    );
};

export default React.memo(FrameCard);
