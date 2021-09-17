import * as React from 'react';
import { ActivityIndicator, useWindowDimensions } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Container, LoaderContainer } from './styles';

type Props = {
    backgroundColor?: keyof Style.Colors;
    color?: keyof Style.Colors;
    bottom?: keyof Style.Spacings;
    show: boolean;
};

const BottomLoader = ({
    backgroundColor = 'primary',
    color = 'secondary-light',
    bottom,
    show,
}: Props) => {
    const theme = useTheme();
    const dimension = useWindowDimensions();

    if (!show) return null;

    return (
        <Container bottom={bottom} width={dimension.width}>
            <LoaderContainer color={backgroundColor}>
                <ActivityIndicator color={theme.colors[color]} size="small" />
            </LoaderContainer>
        </Container>
    );
};

export default BottomLoader;
