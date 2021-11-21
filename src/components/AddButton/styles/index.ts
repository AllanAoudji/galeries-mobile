import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

type ContainerProps = {
    color: keyof Style.Colors;
    size: number;
};

const Container = styled(Animated.View)`
    position: absolute;
    right: ${({ theme }) => theme.spacings.normal};
`;
const InnerContainer = styled.Pressable<ContainerProps>`
    align-items: center;
    background-color: ${({ color, theme }) => theme.colors[color]};
    border-radius: ${({ size }) => `${size / 2}px`};
    height: ${({ size }) => `${size}px`};
    justify-content: center;
    width: ${({ size }) => `${size}px`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container, InnerContainer };
