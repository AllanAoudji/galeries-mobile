import * as React from 'react';

import Logo from '#components/Logo';

import { Container } from './styles';

const SplashScreen = () => {
    return (
        <Container>
            <Logo variant="logotype-fill" size="large" />
        </Container>
    );
};

export default SplashScreen;
