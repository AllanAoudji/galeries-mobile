import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

type ContainerProps = {
    paddingTop: number | undefined;
};

const Container = styled(Animated.View)<ContainerProps>`
    align-items: center;
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex-direction: row;
    justify-content: space-between;
    padding: ${({ paddingTop, theme }) =>
        `${paddingTop || 0}px ${theme.spacings.small} 0 0`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };