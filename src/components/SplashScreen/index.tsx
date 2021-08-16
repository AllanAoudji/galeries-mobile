import * as React from 'react';
import styled from 'styled-components/native';

import Logo from '#components/Logo';

const Container = styled.View`
    align-items: center;
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
    justify-content: center;
`;

const SplashScreen = () => {
    return (
        <Container>
            <Logo variant="logotype-fill" size="large" />
        </Container>
    );
};

export default SplashScreen;
