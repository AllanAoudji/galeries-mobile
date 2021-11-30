import * as React from 'react';
import { Image } from 'react-native';

import { Container, ImageBackgroundStyle } from './styles';

import DefaultProfilePicture from '../../../assets/splash.png';

const IMAGE = Image.resolveAssetSource(DefaultProfilePicture).uri;

const SplashScreen = () => {
    const source = React.useMemo(() => ({ uri: IMAGE }), []);

    return (
        <Container>
            <ImageBackgroundStyle source={source} />
        </Container>
    );
};

export default SplashScreen;
