import { LinearGradientPoint } from 'expo-linear-gradient';
import * as React from 'react';
import { useWindowDimensions } from 'react-native';

import normalizeDefaultCoverPicture from '#helpers/normalizeDefaultCoverPicture';

import { Container, LinearGradientStyled } from './styles';

type Props = {
    galerie: Store.Models.Galerie;
};

const DefaultCoverPicture = ({ galerie }: Props) => {
    const dimension = useWindowDimensions();

    const defaultCoverPictureNormalized = React.useMemo(
        () => normalizeDefaultCoverPicture(galerie.defaultCoverPicture),
        [galerie]
    );
    const end: LinearGradientPoint = React.useMemo(
        () => [
            defaultCoverPictureNormalized.endX,
            defaultCoverPictureNormalized.endY,
        ],
        [defaultCoverPictureNormalized]
    );
    const start: LinearGradientPoint = React.useMemo(
        () => [
            defaultCoverPictureNormalized.startX,
            defaultCoverPictureNormalized.startY,
        ],
        [defaultCoverPictureNormalized]
    );

    return (
        <Container width={dimension.width}>
            <LinearGradientStyled
                colors={defaultCoverPictureNormalized.colors}
                end={end}
                start={start}
                size={dimension.width}
            />
        </Container>
    );
};

export default React.memo(DefaultCoverPicture);
