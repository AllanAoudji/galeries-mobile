import * as React from 'react';
import { ActivityIndicator, useWindowDimensions } from 'react-native';
import { useTheme } from 'styled-components/native';

import { Container, LoaderContainer } from './styles';

type Props = {
    backgroundColor?: keyof Style.Colors;
    bottom?: keyof Style.Spacings;
    color?: keyof Style.Colors;
    show: boolean;
};

const BottomLoader = ({
    backgroundColor = 'primary',
    bottom,
    color = 'secondary-light',
    show,
}: Props) => {
    const dimension = useWindowDimensions();
    const theme = useTheme();

    if (!show) return null;

    return (
        <Container bottom={bottom} width={dimension.width}>
            <LoaderContainer color={backgroundColor}>
                <ActivityIndicator color={theme.colors[color]} size="small" />
            </LoaderContainer>
        </Container>
    );
};

export default React.memo(BottomLoader);
