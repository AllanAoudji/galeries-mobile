import * as React from 'react';
import { useTheme } from 'styled-components/native';
import { GalerieCoverPicture } from '#components';

import { Container, LinearGradientStyle } from './styles';

type Props = {
    galerie: Store.Models.Galerie;
};

const Header = ({ galerie }: Props) => {
    const theme = useTheme();

    return (
        <Container>
            <GalerieCoverPicture galerie={galerie} />
            <LinearGradientStyle
                colors={['transparent', theme.colors['secondary-light']]}
            />
        </Container>
    );
};

export default Header;
