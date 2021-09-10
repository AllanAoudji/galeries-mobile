import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';

type LogoContainerProps = {
    currentHeight: number | undefined;
};
type PictogramContainerProps = {
    currentHeight: number | undefined;
};

const Container = styled(Animated.View)`
    align-items: stretch;
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex-direction: row;
    height: ${() => `${GLOBAL_STYLE.HEADER_TAB_HEIGHT}px`};
`;
const LogoContainer = styled.View<LogoContainerProps>`
    align-items: center;
    bottom: 0;
    justify-content: center;
    left: 0;
    padding-top: ${({ currentHeight }) => `${currentHeight || 0}px`};
    position: absolute;
    right: 0;
    top: 0;
`;
const LogoInnerContainer = styled.Pressable`
    padding: ${({ theme }) => `0 ${theme.spacings.small}`};
`;
const PictogramContainer = styled.Pressable<PictogramContainerProps>`
    bottom: 0;
    justify-content: center;
    padding: ${({ currentHeight, theme }) =>
        `${currentHeight || 0}px ${theme.spacings.small} 0`};
    position: absolute;
    top: 0;
    z-index: 1;
`;

export { Container, LogoContainer, LogoInnerContainer, PictogramContainer };
