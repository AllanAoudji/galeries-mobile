import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

type ContainerProps = {
    currentHeight: number | undefined;
};
type LogoContainerProps = {
    currentHeight: number | undefined;
};

const Container = styled(Animated.View)<ContainerProps>`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex-direction: row;
    padding-top: ${({ currentHeight }) => `${currentHeight || 0}px`};
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

export { Container, LogoContainer, LogoInnerContainer };
